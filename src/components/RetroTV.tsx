"use client";

import { useEffect, useRef, useState } from "react";
import type { Mesh, MeshStandardMaterial, Object3D } from "three";
import {
  BOARD_BEHIND,
  BOARD_FACE_MATERIAL,
  BOARD_FOCUS_FILL,
  BOARD_FOCUS_MS,
  BOARD_GAP,
  BOARD_HEIGHT_FACTOR,
  BOARD_LEFT_NDC,
  BOARD_URL,
  BOARD_YAW,
  SHOW_WHITEBOARD,
} from "@/lib/whiteboard-settings";
import {
  CAMERA_FOV,
  COMPACT_QUERY,
  DESK_SCALE,
  DESK_TV_RIGHT,
  DESK_URL,
  DESKTOP_YAW,
  SHOW_DESK,
  FRAME_MARGIN,
  MOBILE_TV_WIDTH_NDC,
  MOBILE_YAW,
  MODEL_URL,
  SLOT_ASPECT,
  TV_BOTTOM_BIAS,
  TV_RIGHT_NDC,
  TV_WIDTH_M,
} from "@/lib/tv-desk-settings";
import { createFilmGrain } from "@/lib/film-grain";

const VIDEO_URL = "/media/tv/oogway-quote.mp4";
const SCREEN_OFF = "#050505";

function clamp(n: number, lo: number, hi: number) {
  return Math.min(hi, Math.max(lo, n));
}

function isCompactViewport() {
  return window.matchMedia(COMPACT_QUERY).matches;
}

/** Desktop stays cheap; mobile renders closer to the device pixel density. */
function canvasPixelRatio(compact: boolean) {
  return Math.min(window.devicePixelRatio || 1, compact ? 2 : 1.05);
}

/**
 * Desktop: virtual film pinned to the bottom-right of the full viewport.
 * Footer (desktop): same film, pinned to the top of the footer host.
 * Mobile: the canvas itself; the CRT faces the camera and fills it.
 */
function viewSlot(
  host?: HTMLElement | null,
  scale = 1,
  docked = false,
) {
  const compact = isCompactViewport();
  if (docked && !compact) {
    const vw = Math.max(1, host?.clientWidth || window.innerWidth);
    const vh = Math.max(
      1,
      host?.clientHeight || Math.round(window.innerHeight * 0.4),
    );
    const vmin = Math.min(window.innerWidth, window.innerHeight);
    const slotH = clamp(vmin * 0.48 * scale, 280 * scale, vmin * 0.56 * scale);
    const slotW = clamp(slotH * SLOT_ASPECT, 320 * scale, vw * 0.42 * scale);
    return { vw, vh, slotW, slotH, compact, docked: true };
  }
  if (compact) {
    const vw = Math.max(1, host?.clientWidth || window.innerWidth);
    const vh = Math.max(
      1,
      host?.clientHeight || Math.round(Math.min(vw * 0.78, window.innerHeight * 0.7)),
    );
    return { vw, vh, slotW: vw, slotH: vh, compact, docked };
  }
  const vw = Math.max(1, host?.clientWidth || window.innerWidth);
  const vh = Math.max(1, host?.clientHeight || window.innerHeight);
  const vmin = Math.min(vw, vh);
  const slotH = clamp(vmin * 0.48 * scale, 280 * scale, vmin * 0.56 * scale);
  const slotW = clamp(slotH * SLOT_ASPECT, 320 * scale, vw * 0.38 * scale);
  return { vw, vh, slotW, slotH, compact, docked: false };
}

function isPageUiTarget(event: Event) {
  const el = event.target;
  if (!(el instanceof Element)) return false;
  return Boolean(
    el.closest(".site, a, button, input, textarea, select, [role='button']"),
  );
}

function isInteractiveTarget(event: Event) {
  const el = event.target;
  if (!(el instanceof Element)) return false;
  return Boolean(
    el.closest("a, button, input, textarea, select, [role='button']"),
  );
}

function shouldSkip3D() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return true;
  }
  const connection = (
    navigator as Navigator & {
      connection?: { saveData?: boolean };
    }
  ).connection;
  return Boolean(connection?.saveData);
}

function remapUVs(mesh: Mesh) {
  const uv = mesh.geometry.attributes.uv;
  if (!uv) return;

  let minU = Infinity;
  let minV = Infinity;
  let maxU = -Infinity;
  let maxV = -Infinity;
  for (let i = 0; i < uv.count; i++) {
    const u = uv.getX(i);
    const v = uv.getY(i);
    if (u < minU) minU = u;
    if (v < minV) minV = v;
    if (u > maxU) maxU = u;
    if (v > maxV) maxV = v;
  }

  const du = maxU - minU || 1;
  const dv = maxV - minV || 1;
  for (let i = 0; i < uv.count; i++) {
    uv.setXY(i, (uv.getX(i) - minU) / du, (uv.getY(i) - minV) / dv);
  }
  uv.needsUpdate = true;
}

function namedAncestor(obj: Object3D, name: string) {
  let node: Object3D | null = obj;
  while (node) {
    if (node.name === name) return true;
    node = node.parent;
  }
  return false;
}

function boxCorners(box: import("three").Box3, THREE: typeof import("three")) {
  const { min, max } = box;
  return [
    new THREE.Vector3(min.x, min.y, min.z),
    new THREE.Vector3(min.x, min.y, max.z),
    new THREE.Vector3(min.x, max.y, min.z),
    new THREE.Vector3(min.x, max.y, max.z),
    new THREE.Vector3(max.x, min.y, min.z),
    new THREE.Vector3(max.x, min.y, max.z),
    new THREE.Vector3(max.x, max.y, min.z),
    new THREE.Vector3(max.x, max.y, max.z),
  ];
}

export default function RetroTV({
  scale = 1,
  showDesk = true,
  docked = false,
}: {
  scale?: number;
  showDesk?: boolean;
  docked?: boolean;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const playingRef = useRef(false);
  const [ready, setReady] = useState(false);
  const [on, setOn] = useState(false);
  const [boardFocused, setBoardFocused] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const slot = () => viewSlot(host, scale, docked);
    let disposed = false;
    let renderer: import("three").WebGLRenderer | undefined;
    let envMap: import("three").Texture | undefined;
    let drawTex: import("three").CanvasTexture | undefined;
    let frame = 0;
    let camTick = 0;
    let onKeyDown: ((event: KeyboardEvent) => void) | undefined;
    let ro: ResizeObserver | undefined;
    let compactQuery: MediaQueryList | undefined;
    let onViewportChange: (() => void) | undefined;
    let loaderObs: MutationObserver | undefined;
    let visObs: IntersectionObserver | undefined;
    let loaderTimer = 0;
    let idleId = 0;
    let onClick: ((event: MouseEvent) => void) | undefined;
    let onPointerMove: ((event: PointerEvent) => void) | undefined;
    let onPointerDown: ((event: PointerEvent) => void) | undefined;
    let onPointerUp: ((event: PointerEvent) => void) | undefined;
    let onBoardDblClick: ((event: MouseEvent) => void) | undefined;
    let grain: ReturnType<typeof createFilmGrain> | undefined;

    const fail = () => {
      host.dataset.skip = "true";
      grain?.dispose();
      grain = undefined;
      if (renderer) {
        renderer.dispose();
        renderer.domElement.remove();
        renderer = undefined;
      }
    };

    const video = document.createElement("video");
    video.playsInline = true;
    video.preload = "none";
    video.loop = true;
    video.muted = false;
    video.crossOrigin = "anonymous";
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "true");

    const boot = async () => {
      if (shouldSkip3D()) {
        host.dataset.skip = "true";
        return;
      }

      await new Promise<void>((resolve) => {
        if (!document.querySelector(".loading-screen")) {
          resolve();
          return;
        }
        loaderObs = new MutationObserver(() => {
          if (!document.querySelector(".loading-screen")) {
            loaderObs?.disconnect();
            window.clearTimeout(loaderTimer);
            resolve();
          }
        });
        loaderObs.observe(document.body, { childList: true, subtree: true });
        loaderTimer = window.setTimeout(() => {
          loaderObs?.disconnect();
          resolve();
        }, 10000);
      });
      if (disposed) return;

      await new Promise<void>((resolve) => {
        if (typeof requestIdleCallback === "function") {
          idleId = requestIdleCallback(() => resolve(), { timeout: 2200 });
          return;
        }
        idleId = window.setTimeout(resolve, 700);
      });
      if (disposed) return;

      await new Promise<void>((resolve) => {
        if (typeof IntersectionObserver === "undefined") {
          resolve();
          return;
        }
        visObs = new IntersectionObserver(
          (entries) => {
            if (entries.some((entry) => entry.isIntersecting)) {
              visObs?.disconnect();
              resolve();
            }
          },
          { rootMargin: "320px 0px" },
        );
        visObs.observe(host);
      });
      if (disposed) return;

      const THREE = await import("three");
      const { GLTFLoader } = await import(
        "three/addons/loaders/GLTFLoader.js"
      );
      if (disposed) return;

      const { vw, vh, slotW, slotH, compact, docked: isDocked } = slot();
      const pinned = isDocked || !compact;
      const width = vw;
      const height = vh;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(CAMERA_FOV, slotW / slotH, 0.1, 2000);
      try {
        renderer = new THREE.WebGLRenderer({
          antialias: pinned,
          alpha: true,
          powerPreference: "low-power",
          failIfMajorPerformanceCaveat: false,
        });
      } catch {
        fail();
        return;
      }
      if (disposed) {
        renderer.dispose();
        renderer.domElement.remove();
        renderer = undefined;
        return;
      }
      renderer.setClearColor(0x000000, 0);
      renderer.setPixelRatio(canvasPixelRatio(compact));
      renderer.setSize(width, height, false);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 0.9;
      renderer.localClippingEnabled = false;
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFShadowMap;
      host.appendChild(renderer.domElement);

      if (pinned) {
        const { RoomEnvironment } = await import(
          "three/addons/environments/RoomEnvironment.js"
        );
        if (disposed) {
          fail();
          return;
        }
        const pmrem = new THREE.PMREMGenerator(renderer);
        envMap = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
        scene.environment = envMap;
        scene.environmentIntensity = 0.38;
        pmrem.dispose();
      }

      scene.add(new THREE.HemisphereLight(0x8b93a0, 0x2a2622, 0.28));
      const key = new THREE.DirectionalLight(0xffebd4, pinned ? 1.4 : 1.25);
      key.position.set(-2.8, 4.2, 3.4);
      key.castShadow = true;
      key.shadow.mapSize.set(pinned ? 2048 : 1024, pinned ? 2048 : 1024);
      key.shadow.bias = -0.0012;
      key.shadow.normalBias = 0.035;
      scene.add(key);
      scene.add(key.target);
      const fill = new THREE.DirectionalLight(0x8fa0b4, 0.22);
      fill.position.set(3.2, 1.2, 2.4);
      scene.add(fill);

      const loader = new GLTFLoader();
      const [gltf, deskGltf, boardGltf] = await Promise.all([
        loader.loadAsync(MODEL_URL),
        SHOW_DESK && showDesk
          ? loader.loadAsync(DESK_URL)
          : Promise.resolve(null),
        SHOW_WHITEBOARD
          ? loader.loadAsync(BOARD_URL)
          : Promise.resolve(null),
      ]);
      if (disposed) {
        fail();
        return;
      }

      const model =
        gltf.scene.getObjectByName("Hitachi_CRT_TV") ?? gltf.scene;
      model.removeFromParent();
      model.position.set(0, 0, 0);
      model.quaternion.identity();
      model.scale.set(1, 1, 1);

      const screenOffMat = new THREE.MeshStandardMaterial({
        color: SCREEN_OFF,
        emissive: SCREEN_OFF,
        map: null,
        metalness: 0,
        roughness: 1,
        envMapIntensity: 0,
        transparent: false,
        opacity: 1,
        depthWrite: true,
        side: THREE.FrontSide,
      });
      const screenMeshes: Mesh[] = [];
      let bodyMat: MeshStandardMaterial | undefined;

      const makeSolid = (mat: MeshStandardMaterial) => {
        mat.transparent = false;
        mat.opacity = 1;
        mat.depthWrite = true;
        mat.alphaTest = 0;
        mat.side = THREE.FrontSide;
        mat.needsUpdate = true;
      };

      model.traverse((obj) => {
        const mesh = obj as Mesh;
        if (!mesh.isMesh) return;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        mesh.frustumCulled = false;

        if (namedAncestor(mesh, "Screen")) {
          remapUVs(mesh);
          mesh.material = screenOffMat;
          screenMeshes.push(mesh);
          return;
        }

        const prev = Array.isArray(mesh.material)
          ? mesh.material[0]
          : mesh.material;
        if (!bodyMat && prev) {
          bodyMat = (prev as MeshStandardMaterial).clone();
          makeSolid(bodyMat);
          bodyMat.envMapIntensity = 0.28;
        }
        if (bodyMat) mesh.material = bodyMat;
        else if (prev) makeSolid(prev as MeshStandardMaterial);
      });

      model.updateWorldMatrix(true, true);
      const center = new THREE.Box3()
        .setFromObject(model)
        .getCenter(new THREE.Vector3());
      model.position.sub(center);

      model.updateWorldMatrix(true, true);
      const tvBox = new THREE.Box3().setFromObject(model);
      const tvSize = tvBox.getSize(new THREE.Vector3());
      const tvCenter = tvBox.getCenter(new THREE.Vector3());
      let desk: import("three").Group | undefined;
      let deskPlaced: import("three").Box3 | undefined;
      let deskSize: import("three").Vector3 | undefined;
      if (deskGltf) {
        desk = deskGltf.scene;
        desk.traverse((obj) => {
          const mesh = obj as Mesh;
          if (!mesh.isMesh) return;
          mesh.castShadow = true;
          mesh.receiveShadow = true;
          const mats = Array.isArray(mesh.material)
            ? mesh.material
            : [mesh.material];
          for (const raw of mats) {
            const mat = raw as MeshStandardMaterial;
            mat.transparent = false;
            mat.opacity = 1;
            mat.depthWrite = true;
            mat.side = THREE.FrontSide;
            mat.envMapIntensity = 0.3;
            mat.needsUpdate = true;
          }
        });
        desk.scale.setScalar((tvSize.x / TV_WIDTH_M) * DESK_SCALE);
        desk.updateWorldMatrix(true, true);
        const deskBox = new THREE.Box3().setFromObject(desk);
        deskSize = deskBox.getSize(new THREE.Vector3());
        const deskCenter = deskBox.getCenter(new THREE.Vector3());
        const rightShift = deskSize.x * DESK_TV_RIGHT;
        desk.position.x += tvCenter.x - rightShift - deskCenter.x;
        desk.position.y += tvBox.min.y - deskBox.max.y + tvSize.y * 0.01;
        desk.position.z += tvCenter.z - deskCenter.z;
        desk.updateWorldMatrix(true, true);
        deskPlaced = new THREE.Box3().setFromObject(desk);
      }
      const standBox = deskPlaced ?? tvBox;
      const standSize = deskSize ?? tvSize;
      const groundY = deskPlaced ? deskPlaced.min.y : tvBox.min.y;

      let boardRoot: import("three").Group | undefined;
      let drawMesh: Mesh | undefined;
      let boardHome: import("three").Vector3 | undefined;
      const faceBox = new THREE.Box3();
      const faceCenter = new THREE.Vector3();
      let inkW = 2048;
      let inkH = 2048;
      let inkCtx: CanvasRenderingContext2D | null = null;

      if (SHOW_WHITEBOARD && boardGltf) {
      const board = boardGltf.scene;
      board.traverse((obj) => {
        const mesh = obj as Mesh;
        if (!mesh.isMesh) return;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        const mats = Array.isArray(mesh.material)
          ? mesh.material
          : [mesh.material];
        for (const raw of mats) {
          const mat = raw as MeshStandardMaterial;
          mat.transparent = false;
          mat.opacity = 1;
          mat.depthWrite = true;
          mat.side = THREE.FrontSide;
          mat.envMapIntensity = 0.3;
          if (mat.name === BOARD_FACE_MATERIAL) {
            mat.color.set("#ffffff");
            mat.roughness = 0.9;
            mat.metalness = 0;
            mat.envMapIntensity = 0.12;
          }
          mat.needsUpdate = true;
        }
      });
      board.updateWorldMatrix(true, true);
      const boardOrigin = new THREE.Box3()
        .setFromObject(board)
        .getCenter(new THREE.Vector3());
      board.position.sub(boardOrigin);

      boardRoot = new THREE.Group();
      boardRoot.add(board);
      boardRoot.updateWorldMatrix(true, true);
      const boardSize0 = new THREE.Box3()
        .setFromObject(boardRoot)
        .getSize(new THREE.Vector3());

      let faceMesh: Mesh | undefined;
      let bestFaceArea = 0;
      board.traverse((obj) => {
        const mesh = obj as Mesh;
        if (!mesh.isMesh) return;
        const mats = Array.isArray(mesh.material)
          ? mesh.material
          : [mesh.material];
        if (
          !mats.some(
            (mat) => (mat as MeshStandardMaterial).name === BOARD_FACE_MATERIAL,
          )
        ) {
          return;
        }
        const box = new THREE.Box3().setFromObject(mesh);
        const s = box.getSize(new THREE.Vector3());
        const dims = [s.x, s.y, s.z].sort((a, b) => a - b);
        const area = dims[1] * dims[2];
        if (area > bestFaceArea) {
          bestFaceArea = area;
          faceMesh = mesh;
        }
      });
      if (faceMesh) faceBox.setFromObject(faceMesh);
      else faceBox.setFromObject(boardRoot);
      faceBox.getCenter(faceCenter);
      const faceSize = faceBox.getSize(new THREE.Vector3());
      const drawW = faceSize.x * 0.9;
      const drawH = faceSize.y * 0.84;
      const inkAspect = drawW / Math.max(drawH, 0.001);
      inkW = 2048;
      inkH = Math.round(2048 / inkAspect);
      if (inkH > 2048) {
        inkH = 2048;
        inkW = Math.round(2048 * inkAspect);
      }
      const ink = document.createElement("canvas");
      ink.width = inkW;
      ink.height = inkH;
      inkCtx = ink.getContext("2d");
      inkCtx?.clearRect(0, 0, inkW, inkH);
      drawTex = new THREE.CanvasTexture(ink);
      drawTex.colorSpace = THREE.SRGBColorSpace;
      drawTex.premultiplyAlpha = true;
      drawTex.minFilter = THREE.LinearFilter;
      drawTex.magFilter = THREE.LinearFilter;
      const drawMat = new THREE.MeshBasicMaterial({
        map: drawTex,
        transparent: true,
        opacity: 1,
        depthWrite: false,
        toneMapped: false,
        side: THREE.FrontSide,
        polygonOffset: true,
        polygonOffsetFactor: -2,
        polygonOffsetUnits: -2,
      });
      drawMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(drawW, drawH),
        drawMat,
      );
      drawMesh.position.set(faceCenter.x, faceCenter.y, faceBox.max.z + 0.004);
      drawMesh.castShadow = false;
      drawMesh.receiveShadow = false;
      drawMesh.renderOrder = 2;
      boardRoot.add(drawMesh);

      const stackH = tvBox.max.y - standBox.min.y;
      boardRoot.scale.setScalar(
        (stackH * BOARD_HEIGHT_FACTOR) / (boardSize0.y || 1),
      );
      // Stay upright and face the same way as the TV/desk.
      boardRoot.rotation.y = BOARD_YAW;
      boardRoot.updateWorldMatrix(true, true);
      const boardBox = new THREE.Box3().setFromObject(boardRoot);
      const boardCenter = boardBox.getCenter(new THREE.Vector3());
      const standDepth = standBox.max.z - standBox.min.z;
      const standMidZ = (standBox.min.z + standBox.max.z) / 2;
      boardRoot.position.x +=
        standBox.min.x - standSize.x * BOARD_GAP - boardBox.max.x;
      boardRoot.position.y += groundY - boardBox.min.y;
      boardRoot.position.z +=
        standMidZ - standDepth * BOARD_BEHIND - boardCenter.z;
      boardRoot.updateWorldMatrix(true, true);
      const boardPlaced = new THREE.Box3().setFromObject(boardRoot);
      boardRoot.position.y += groundY - boardPlaced.min.y;
      boardRoot.updateWorldMatrix(true, true);
      boardPlaced.setFromObject(boardRoot);
      boardHome = boardRoot.position.clone();
      }

      const rig = new THREE.Group();
      rig.add(model);
      if (desk) rig.add(desk);
      if (boardRoot) rig.add(boardRoot);

      const floorBox = boardRoot
        ? standBox.clone().union(new THREE.Box3().setFromObject(boardRoot))
        : standBox.clone();
      const floorSpan = Math.max(
        floorBox.max.x - floorBox.min.x,
        floorBox.max.z - floorBox.min.z,
        tvSize.x,
        tvSize.z,
      );
      const shadowFloor = new THREE.Mesh(
        new THREE.PlaneGeometry(
          floorSpan * (showDesk ? 1.4 : 2.6),
          floorSpan * (showDesk ? 1.4 : 2.8),
        ),
        new THREE.ShadowMaterial({
          color: 0x1a120c,
          opacity: showDesk ? 0.2 : 0.45,
        }),
      );
      shadowFloor.rotation.x = -Math.PI / 2;
      shadowFloor.position.set(
        (floorBox.min.x + floorBox.max.x) / 2,
        groundY + 0.006,
        (floorBox.min.z + floorBox.max.z) / 2,
      );
      shadowFloor.receiveShadow = true;
      shadowFloor.castShadow = false;
      shadowFloor.raycast = () => {};
      rig.add(shadowFloor);

      if (!showDesk) {
        const blob = new THREE.Mesh(
          new THREE.CircleGeometry(1, 48),
          new THREE.MeshBasicMaterial({
            color: 0x000000,
            transparent: true,
            opacity: 0.22,
            depthWrite: false,
          }),
        );
        blob.rotation.x = -Math.PI / 2;
        blob.position.set(
          tvCenter.x,
          groundY + 0.004,
          tvCenter.z + tvSize.z * 0.06,
        );
        blob.scale.set(tvSize.x * 0.72, tvSize.z * 0.55, 1);
        blob.receiveShadow = false;
        blob.castShadow = false;
        blob.raycast = () => {};
        rig.add(blob);
      }
      scene.add(rig);

      rig.rotation.y = compact ? MOBILE_YAW : DESKTOP_YAW;
      rig.updateWorldMatrix(true, true);

      const fitShadow = () => {
        const span = new THREE.Box3().setFromObject(rig);
        const mid = span.getCenter(new THREE.Vector3());
        const size = span.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z) || 1;
        key.position.set(
          mid.x - maxDim * 0.65,
          mid.y + maxDim * 1.25,
          mid.z + maxDim * 0.55,
        );
        key.target.position.copy(mid);
        key.target.updateMatrixWorld();
        const cam = key.shadow.camera;
        const extent = maxDim * 0.72;
        cam.left = -extent;
        cam.right = extent;
        cam.top = extent;
        cam.bottom = -extent;
        cam.near = Math.max(0.5, maxDim * 0.08);
        cam.far = maxDim * 4;
        cam.updateProjectionMatrix();
        key.shadow.needsUpdate = true;
      };

      const ndc = new THREE.Vector3();
      const pointer = new THREE.Vector2();
      const raycaster = new THREE.Raycaster();

      const frameRig = () => {
        const {
          vw: nextW,
          vh: nextH,
          slotW: filmW,
          slotH: filmH,
          compact: compactNow,
          docked: dockedNow,
        } = slot();
        const pinFilm = !compactNow;
        const tvFrame = new THREE.Box3().setFromObject(model);
        const tvH = tvFrame.max.y - tvFrame.min.y;
        const topY = tvFrame.max.y;
        // Same crop as when the CRT sat on the desk: a little air under the feet.
        const botY = desk
          ? new THREE.Box3().setFromObject(desk).max.y - tvH * 0.1
          : tvFrame.min.y - tvH * 0.38;
        const viewH = Math.max(0.001, topY - botY) * FRAME_MARGIN;
        const fov = THREE.MathUtils.degToRad(camera.fov);
        let dist = viewH / 2 / Math.tan(fov / 2);

        let midX = tvFrame.getCenter(new THREE.Vector3()).x;
        const midY = (topY + botY) / 2;
        const midZ = tvFrame.getCenter(new THREE.Vector3()).z;

        camera.up.set(0, 1, 0);
        camera.clearViewOffset();
        camera.aspect = pinFilm ? filmW / filmH : nextW / nextH;
        camera.near = Math.max(0.1, dist / 80);
        camera.far = dist * 10;

        const place = () => {
          camera.position.set(midX, midY, midZ + dist);
          camera.lookAt(midX, midY, midZ);
          camera.updateMatrixWorld(true);
          camera.updateProjectionMatrix();
        };
        place();

        for (let pass = 0; pass < 8; pass++) {
          let tvGrow = 1;
          for (const corner of boxCorners(tvFrame, THREE)) {
            ndc.copy(corner).project(camera);
            if (!Number.isFinite(ndc.x) || !Number.isFinite(ndc.y)) continue;
            tvGrow = Math.max(
              tvGrow,
              Math.abs(ndc.x) * 1.1,
              Math.abs(ndc.y) * 1.1,
            );
          }
          if (tvGrow <= 1.001) break;
          dist *= tvGrow;
          camera.near = Math.max(0.1, dist / 80);
          camera.far = dist * 10;
          place();
        }

        if (!pinFilm) {
          for (let pass = 0; pass < 8; pass++) {
            let maxX = 0;
            let maxY = 0;
            for (const corner of boxCorners(tvFrame, THREE)) {
              ndc.copy(corner).project(camera);
              if (!Number.isFinite(ndc.x) || !Number.isFinite(ndc.y)) continue;
              maxX = Math.max(maxX, Math.abs(ndc.x));
              maxY = Math.max(maxY, Math.abs(ndc.y));
            }
            const scale = Math.max(
              maxX / MOBILE_TV_WIDTH_NDC,
              maxY / 0.96,
            );
            if (!Number.isFinite(scale) || Math.abs(scale - 1) < 0.012) break;
            dist *= scale;
            camera.near = Math.max(0.1, dist / 80);
            camera.far = dist * 10;
            place();
          }
        } else {
          let tvRight = -Infinity;
          for (const corner of boxCorners(tvFrame, THREE)) {
            ndc.copy(corner).project(camera);
            if (Number.isFinite(ndc.x)) tvRight = Math.max(tvRight, ndc.x);
          }
          if (Number.isFinite(tvRight) && tvRight < TV_RIGHT_NDC) {
            const halfW = dist * Math.tan(fov / 2) * (filmW / filmH);
            midX -= (TV_RIGHT_NDC - tvRight) * halfW;
            place();
          }

          camera.setViewOffset(
            filmW,
            filmH,
            filmW - nextW,
            (filmH - nextH) * TV_BOTTOM_BIAS,
            nextW,
            nextH,
          );
        }
        if (boardRoot && boardHome && drawMesh) {
        boardRoot.position.copy(boardHome);
        boardRoot.updateWorldMatrix(true, true);

        if (!compactNow) {
          const boardMinNdcX = () => {
            boardRoot.updateWorldMatrix(true, true);
            const box = new THREE.Box3().setFromObject(boardRoot);
            let minX = Infinity;
            for (const corner of boxCorners(box, THREE)) {
              ndc.copy(corner).project(camera);
              if (Number.isFinite(ndc.x)) minX = Math.min(minX, ndc.x);
            }
            return minX;
          };
          const left = new THREE.Vector3(-1, 0, 0).transformDirection(
            camera.matrixWorld,
          );
          left.y = 0;
          if (left.lengthSq() > 1e-8) {
            left.normalize();
            const worldPos = new THREE.Vector3();
            const keepY = boardRoot.position.y;
            const applyWorldShift = (meters: number) => {
              boardRoot.getWorldPosition(worldPos);
              worldPos.addScaledVector(left, meters);
              rig.worldToLocal(worldPos);
              boardRoot.position.copy(worldPos);
              boardRoot.position.y = keepY;
              boardRoot.updateWorldMatrix(true, true);
            };
            const before = boardMinNdcX();
            if (Number.isFinite(before)) {
              applyWorldShift(0.08);
              const after = boardMinNdcX();
              applyWorldShift(-0.08);
              const ndcPerMeter = (after - before) / 0.08;
              if (Math.abs(ndcPerMeter) > 1e-5) {
                applyWorldShift((BOARD_LEFT_NDC - before) / ndcPerMeter);
              }
            }
          }
        }

        const origin = new THREE.Vector3();
        boardRoot.getWorldPosition(origin);
        const toCam = camera.position.clone().sub(origin);
        toCam.y = 0;
        toCam.normalize();
        const plusZ = new THREE.Vector3(0, 0, 1).transformDirection(
          boardRoot.matrixWorld,
        );
        plusZ.y = 0;
        plusZ.normalize();
        const facePlus = plusZ.dot(toCam) >= 0;
        drawMesh.rotation.y = facePlus ? 0 : Math.PI;
        drawMesh.position.set(
          faceCenter.x,
          faceCenter.y,
          (facePlus ? faceBox.max.z : faceBox.min.z) +
            (facePlus ? 0.004 : -0.004),
        );
        }
        fitShadow();
      };
      frameRig();

      const screenAspect = 21.28 / 15.84;
      let videoTexture: import("three").VideoTexture | undefined;
      let crtMat: import("three").MeshBasicMaterial | undefined;
      let crtTime = { value: 0 };
      grain = createFilmGrain(THREE);

      const paint = () => {
        if (!renderer) return;
        renderer.render(scene, camera);
        grain?.render(renderer);
      };

      const loop = () => {
        if (disposed || !playingRef.current) return;
        crtTime.value = performance.now() * 0.001;
        if (videoTexture) videoTexture.needsUpdate = true;
        paint();
        frame = window.requestAnimationFrame(loop);
      };

      const applyCover = (texture: import("three").VideoTexture) => {
        const videoAspect =
          (video.videoWidth || 640) / (video.videoHeight || 266);
        texture.wrapS = THREE.ClampToEdgeWrapping;
        texture.wrapT = THREE.ClampToEdgeWrapping;
        if (videoAspect > screenAspect) {
          texture.repeat.set(screenAspect / videoAspect, 1);
          texture.offset.set((1 - texture.repeat.x) / 2, 0);
        } else {
          texture.repeat.set(1, videoAspect / screenAspect);
          texture.offset.set(0, (1 - texture.repeat.y) / 2);
        }
      };

      const buildCrtMaterial = (map: import("three").VideoTexture) => {
        const mat = new THREE.MeshBasicMaterial({
          map,
          toneMapped: true,
        });
        mat.customProgramCacheKey = () => "retro-crt-static";
        mat.onBeforeCompile = (shader) => {
          shader.uniforms.uTime = crtTime;
          shader.fragmentShader = shader.fragmentShader
            .replace(
              "void main() {",
              `uniform float uTime;
float crtHash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}
void main() {`,
            )
            .replace(
              "vec3 outgoingLight = reflectedLight.indirectDiffuse;",
              `vec3 outgoingLight = reflectedLight.indirectDiffuse;
#ifdef USE_MAP
  float scan = 0.9 + 0.1 * sin(vMapUv.y * 520.0);
  outgoingLight *= scan;
  float snow = crtHash(gl_FragCoord.xy + vec2(uTime * 163.7, uTime * 91.3));
  float burst = crtHash(vec2(floor(uTime * 13.0), 8.4));
  outgoingLight = mix(outgoingLight, vec3(snow), 0.08 + 0.05 * burst);
  float roll = smoothstep(0.04, 0.0, abs(fract(vMapUv.y * 0.18 - uTime * 0.07) - 0.48));
  outgoingLight += roll * 0.05;
  vec2 q = vMapUv * 2.0 - 1.0;
  outgoingLight *= 1.0 - dot(q, q) * 0.15;
  outgoingLight *= 0.97 + 0.03 * crtHash(vec2(floor(uTime * 18.0), 3.1));
#endif
`,
            );
        };
        return mat;
      };

      const turnOn = async () => {
        if (!video.getAttribute("src")) {
          video.src = VIDEO_URL;
          video.load();
        }
        try {
          video.muted = false;
          await video.play();
        } catch {
          try {
            video.muted = true;
            await video.play();
          } catch {
            return;
          }
        }

        if (!videoTexture) {
          videoTexture = new THREE.VideoTexture(video);
          videoTexture.colorSpace = THREE.SRGBColorSpace;
          videoTexture.flipY = false;
          videoTexture.minFilter = THREE.LinearFilter;
          videoTexture.magFilter = THREE.LinearFilter;
          videoTexture.generateMipmaps = false;
        }
        applyCover(videoTexture);

        if (!crtMat) crtMat = buildCrtMaterial(videoTexture);
        else crtMat.map = videoTexture;
        crtMat.needsUpdate = true;
        for (const mesh of screenMeshes) mesh.material = crtMat;

        playingRef.current = true;
        setOn(true);
        window.cancelAnimationFrame(frame);
        frame = window.requestAnimationFrame(loop);
      };

      const turnOff = () => {
        video.pause();
        playingRef.current = false;
        setOn(false);
        window.cancelAnimationFrame(frame);
        for (const mesh of screenMeshes) mesh.material = screenOffMat;
        paint();
      };

      let boardFocus = false;
      let focusReady = false;
      let pendingFocus = false;
      let drawing = false;
      let drewStroke = false;
      let prevInk: { x: number; y: number } | null = null;
      let midInk: { x: number; y: number } | null = null;
      const camFromPos = new THREE.Vector3();
      const camFromQuat = new THREE.Quaternion();
      const camToPos = new THREE.Vector3();
      const camToQuat = new THREE.Quaternion();
      const camToUp = new THREE.Vector3(0, 1, 0);
      let camAnimStart = 0;
      let camAnimMs = BOARD_FOCUS_MS;

      const stopCamAnim = () => {
        window.cancelAnimationFrame(camTick);
        camTick = 0;
      };

      const boardCamPose = () => {
        if (!drawMesh || !boardRoot) {
          return {
            pos: camera.position.clone(),
            target: new THREE.Vector3(),
            up: new THREE.Vector3(0, 1, 0),
            nextW: 1,
            nextH: 1,
            dist: 1,
          };
        }
        const { vw: nextW, vh: nextH } = slot();
        drawMesh.updateWorldMatrix(true, true);
        boardRoot.updateWorldMatrix(true, true);
        const target = new THREE.Box3()
          .setFromObject(drawMesh)
          .getCenter(new THREE.Vector3());
        const normal = new THREE.Vector3(0, 0, 1).transformDirection(
          drawMesh.matrixWorld,
        );
        normal.normalize();
        const up = new THREE.Vector3(0, 1, 0).transformDirection(
          drawMesh.matrixWorld,
        );
        up.normalize();
        const box = new THREE.Box3().setFromObject(boardRoot);
        const size = box.getSize(new THREE.Vector3());
        const fov = THREE.MathUtils.degToRad(camera.fov);
        const fitH = Math.max(size.y, size.x / Math.max(nextW / nextH, 0.2));
        let dist =
          (fitH / BOARD_FOCUS_FILL / 2) / Math.tan(fov / 2);
        dist = Math.max(dist, 0.35);
        const pos = target.clone().addScaledVector(normal, dist);
        return { pos, target, up, nextW, nextH, dist };
      };

      const applyBoardCam = () => {
        if (!drawMesh || !boardRoot) return;
        const pose = boardCamPose();
        camera.clearViewOffset();
        camera.aspect = pose.nextW / pose.nextH;
        camera.near = Math.max(0.1, pose.dist / 80);
        camera.far = pose.dist * 12;
        camera.up.copy(pose.up);
        camera.position.copy(pose.pos);
        camera.lookAt(pose.target);
        camera.updateMatrixWorld(true);
        camera.updateProjectionMatrix();
        const fitBox = new THREE.Box3().setFromObject(drawMesh);
        for (let pass = 0; pass < 8; pass++) {
          let maxSpan = 0;
          for (const corner of boxCorners(fitBox, THREE)) {
            ndc.copy(corner).project(camera);
            if (!Number.isFinite(ndc.x) || !Number.isFinite(ndc.y)) continue;
            maxSpan = Math.max(
              maxSpan,
              Math.abs(ndc.x) / BOARD_FOCUS_FILL,
              Math.abs(ndc.y) / BOARD_FOCUS_FILL,
            );
          }
          if (maxSpan <= 0.001) break;
          if (Math.abs(maxSpan - 1) < 0.012) break;
          pose.dist *= clamp(maxSpan, 0.35, 4);
          const dir = camera.position.clone().sub(pose.target).normalize();
          camera.near = Math.max(0.1, pose.dist / 80);
          camera.far = pose.dist * 12;
          camera.position.copy(pose.target).addScaledVector(dir, pose.dist);
          camera.lookAt(pose.target);
          camera.updateMatrixWorld(true);
          camera.updateProjectionMatrix();
        }
      };

      const animateCameraTo = (
        toPos: import("three").Vector3,
        toQuat: import("three").Quaternion,
        toUp: import("three").Vector3,
        onDone?: () => void,
      ) => {
        stopCamAnim();
        camFromPos.copy(camera.position);
        camFromQuat.copy(camera.quaternion);
        camToPos.copy(toPos);
        camToQuat.copy(toQuat);
        camToUp.copy(toUp);
        camAnimStart = performance.now();
        const reduced = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;
        camAnimMs = reduced ? 1 : BOARD_FOCUS_MS;
        const tick = () => {
          if (disposed) return;
          const t = Math.min(1, (performance.now() - camAnimStart) / camAnimMs);
          const e = 1 - (1 - t) ** 3;
          camera.position.lerpVectors(camFromPos, camToPos, e);
          camera.quaternion.slerpQuaternions(camFromQuat, camToQuat, e);
          camera.up.copy(camToUp);
          camera.updateMatrixWorld(true);
          paint();
          if (t < 1) {
            camTick = window.requestAnimationFrame(tick);
            return;
          }
          camTick = 0;
          onDone?.();
        };
        camTick = window.requestAnimationFrame(tick);
      };

      const enterBoardFocus = () => {
        if (!drawMesh || !boardRoot) return;
        boardFocus = true;
        focusReady = false;
        pendingFocus = false;
        host.dataset.boardFocus = "true";
        document.body.classList.add("is-board-focus");
        setBoardFocused(true);
        const pose = boardCamPose();
        camera.clearViewOffset();
        camera.aspect = pose.nextW / pose.nextH;
        camera.near = Math.max(0.1, pose.dist / 80);
        camera.far = pose.dist * 12;
        camera.updateProjectionMatrix();
        const savedPos = camera.position.clone();
        const savedQuat = camera.quaternion.clone();
        camera.up.copy(pose.up);
        camera.position.copy(pose.pos);
        camera.lookAt(pose.target);
        camera.updateMatrixWorld(true);
        applyBoardCam();
        const toPos = camera.position.clone();
        const toQuat = camera.quaternion.clone();
        const toUp = camera.up.clone();
        camera.position.copy(savedPos);
        camera.quaternion.copy(savedQuat);
        animateCameraTo(toPos, toQuat, toUp, () => {
          applyBoardCam();
          focusReady = true;
          paint();
        });
      };

      const exitBoardFocus = () => {
        if (!boardFocus) return;
        boardFocus = false;
        focusReady = false;
        drawing = false;
        prevInk = null;
        midInk = null;
        host.dataset.boardFocus = "false";
        document.body.classList.remove("is-board-focus");
        setBoardFocused(false);
        const savedPos = camera.position.clone();
        const savedQuat = camera.quaternion.clone();
        camera.up.set(0, 1, 0);
        frameRig();
        const toPos = camera.position.clone();
        const toQuat = camera.quaternion.clone();
        const toUp = camera.up.clone();
        camera.position.copy(savedPos);
        camera.quaternion.copy(savedQuat);
        camera.clearViewOffset();
        const { vw: nextW, vh: nextH } = slot();
        camera.aspect = nextW / nextH;
        camera.updateProjectionMatrix();
        animateCameraTo(toPos, toQuat, toUp, () => {
          camera.up.set(0, 1, 0);
          frameRig();
          paint();
        });
      };

      const hitsObject = (event: PointerEvent | MouseEvent, obj: Object3D) => {
        const rect = renderer!.domElement.getBoundingClientRect();
        if (rect.width < 1 || rect.height < 1) return null;
        pointer.set(
          ((event.clientX - rect.left) / rect.width) * 2 - 1,
          -((event.clientY - rect.top) / rect.height) * 2 + 1,
        );
        raycaster.setFromCamera(pointer, camera);
        return raycaster.intersectObject(obj, true)[0] ?? null;
      };

      const isBoardObject = (obj: Object3D) => {
        let node: Object3D | null = obj;
        while (node) {
          if (node === boardRoot) return true;
          if (node === rig) return false;
          node = node.parent;
        }
        return false;
      };

      const hitsBoardInk = (event: PointerEvent | MouseEvent) => {
        const rect = renderer!.domElement.getBoundingClientRect();
        if (rect.width < 1 || rect.height < 1) return null;
        pointer.set(
          ((event.clientX - rect.left) / rect.width) * 2 - 1,
          -((event.clientY - rect.top) / rect.height) * 2 + 1,
        );
        raycaster.setFromCamera(pointer, camera);
        const hits = raycaster.intersectObject(rig, true);
        if (!hits.length || !isBoardObject(hits[0].object)) return null;
        return hits.find((hit) => hit.object === drawMesh) ?? null;
      };

      const markerW = Math.max(4, inkW * 0.011);
      if (inkCtx) {
        inkCtx.lineCap = "round";
        inkCtx.lineJoin = "round";
        inkCtx.strokeStyle = "#1c1c1c";
        inkCtx.fillStyle = "#1c1c1c";
        inkCtx.lineWidth = markerW;
        inkCtx.imageSmoothingEnabled = true;
        inkCtx.imageSmoothingQuality = "high";
      }

      const curveTo = (pt: { x: number; y: number }) => {
        if (!inkCtx) return;
        if (!prevInk || !midInk) {
          inkCtx.beginPath();
          inkCtx.arc(pt.x, pt.y, markerW / 2, 0, Math.PI * 2);
          inkCtx.fill();
          prevInk = pt;
          midInk = pt;
          return;
        }
        const nextMid = {
          x: (prevInk.x + pt.x) / 2,
          y: (prevInk.y + pt.y) / 2,
        };
        inkCtx.beginPath();
        inkCtx.moveTo(midInk.x, midInk.y);
        inkCtx.quadraticCurveTo(prevInk.x, prevInk.y, nextMid.x, nextMid.y);
        inkCtx.stroke();
        midInk = nextMid;
        prevInk = pt;
      };

      const strokeTo = (pt: { x: number; y: number }) => {
        if (prevInk) {
          const from = prevInk;
          const gap = Math.hypot(pt.x - from.x, pt.y - from.y);
          const step = Math.max(2.5, markerW * 0.4);
          if (gap > step * 2) {
            const n = Math.min(16, Math.floor(gap / step));
            for (let i = 1; i < n; i++) {
              const t = i / n;
              curveTo({
                x: from.x + (pt.x - from.x) * t,
                y: from.y + (pt.y - from.y) * t,
              });
            }
          }
        }
        curveTo(pt);
      };

      const finishStroke = () => {
        if (!inkCtx || !prevInk || !midInk) return;
        inkCtx.beginPath();
        inkCtx.moveTo(midInk.x, midInk.y);
        inkCtx.lineTo(prevInk.x, prevInk.y);
        inkCtx.stroke();
      };

      const flushInk = () => {
        if (drawTex) drawTex.needsUpdate = true;
        paint();
      };

      const hitsBoard = (event: PointerEvent | MouseEvent) => {
        const hit = hitsObject(event, rig);
        return hit && isBoardObject(hit.object) ? hit : null;
      };

      const inkFromHit = (hit: import("three").Intersection) => {
        if (!hit.uv) return null;
        return {
          x: hit.uv.x * inkW,
          y: (1 - hit.uv.y) * inkH,
        };
      };

      const inkPointFromEvent = (event: PointerEvent | MouseEvent) => {
        const hit = hitsBoardInk(event);
        return hit ? inkFromHit(hit) : null;
      };

      onPointerDown = (event: PointerEvent) => {
        if (event.button !== 0) return;
        if (isInteractiveTarget(event)) {
          if (boardFocus) exitBoardFocus();
          return;
        }
        if (!boardFocus) {
          if (hitsBoard(event)) pendingFocus = true;
          return;
        }
        if (!focusReady) return;
        const pt = inkPointFromEvent(event);
        if (!pt) {
          pendingFocus = false;
          return;
        }
        drawing = true;
        drewStroke = true;
        prevInk = null;
        midInk = null;
        strokeTo(pt);
        flushInk();
        event.preventDefault();
      };

      onPointerUp = () => {
        if (drawing) {
          finishStroke();
          flushInk();
        }
        drawing = false;
        prevInk = null;
        midInk = null;
      };

      onClick = (event: MouseEvent) => {
        if (pendingFocus) {
          pendingFocus = false;
          if (hitsBoard(event)) enterBoardFocus();
          return;
        }
        if (drewStroke) {
          drewStroke = false;
          return;
        }
        if (boardFocus) {
          if (!hitsBoard(event)) exitBoardFocus();
          return;
        }
        if (isPageUiTarget(event) || !hitsObject(event, model)) return;
        if (playingRef.current) turnOff();
        else void turnOn();
      };

      onPointerMove = (event: PointerEvent) => {
        if (drawing && boardFocus && focusReady) {
          const samples =
            typeof event.getCoalescedEvents === "function" &&
            event.getCoalescedEvents().length > 0
              ? event.getCoalescedEvents()
              : [event];
          let drew = false;
          for (const sample of samples) {
            const pt = inkPointFromEvent(sample);
            if (pt) {
              strokeTo(pt);
              drew = true;
            }
          }
          if (drew) flushInk();
          document.body.style.cursor = "crosshair";
          return;
        }
        if (isInteractiveTarget(event)) {
          document.body.style.cursor = "";
          return;
        }
        if (hitsBoard(event)) {
          document.body.style.cursor = boardFocus ? "crosshair" : "pointer";
          return;
        }
        if (!boardFocus && !isPageUiTarget(event) && hitsObject(event, model)) {
          document.body.style.cursor = "pointer";
          return;
        }
        document.body.style.cursor = boardFocus ? "default" : "";
      };

      onBoardDblClick = (event: MouseEvent) => {
        if (!boardFocus || !focusReady) return;
        if (isInteractiveTarget(event)) return;
        if (!hitsBoardInk(event) || !inkCtx) return;
        inkCtx.clearRect(0, 0, inkW, inkH);
        if (drawTex) drawTex.needsUpdate = true;
        paint();
      };

      onKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape" && boardFocus) exitBoardFocus();
      };

      window.addEventListener("pointerdown", onPointerDown);
      window.addEventListener("pointerup", onPointerUp);
      window.addEventListener("pointercancel", onPointerUp);
      window.addEventListener("click", onClick);
      window.addEventListener("pointermove", onPointerMove);
      window.addEventListener("dblclick", onBoardDblClick);
      window.addEventListener("keydown", onKeyDown);

      const resize = () => {
        if (!renderer || disposed) return;
        const { vw: nextW, vh: nextH, compact: compactNow } = slot();
        rig.rotation.y = compactNow ? MOBILE_YAW : DESKTOP_YAW;
        if (boardFocus) applyBoardCam();
        else frameRig();
        renderer.setPixelRatio(canvasPixelRatio(compactNow));
        renderer.setSize(nextW, nextH, false);
        paint();
      };

      compactQuery = window.matchMedia(COMPACT_QUERY);
      onViewportChange = resize;
      compactQuery.addEventListener("change", resize);
      ro = new ResizeObserver(resize);
      ro.observe(host);
      paint();
      setReady(true);
    };

    void boot().catch(() => {
      fail();
    });

    return () => {
      disposed = true;
      playingRef.current = false;
      window.cancelAnimationFrame(frame);
      window.cancelAnimationFrame(camTick);
      window.clearTimeout(loaderTimer);
      window.clearTimeout(idleId);
      if (typeof cancelIdleCallback === "function") {
        cancelIdleCallback(idleId);
      }
      loaderObs?.disconnect();
      visObs?.disconnect();
      ro?.disconnect();
      if (compactQuery && onViewportChange) {
        compactQuery.removeEventListener("change", onViewportChange);
      }
      video.pause();
      video.removeAttribute("src");
      video.load();
      if (onClick) window.removeEventListener("click", onClick);
      if (onPointerMove) {
        window.removeEventListener("pointermove", onPointerMove);
      }
      if (onPointerDown) {
        window.removeEventListener("pointerdown", onPointerDown);
      }
      if (onPointerUp) {
        window.removeEventListener("pointerup", onPointerUp);
        window.removeEventListener("pointercancel", onPointerUp);
      }
      if (onBoardDblClick) {
        window.removeEventListener("dblclick", onBoardDblClick);
      }
      if (onKeyDown) window.removeEventListener("keydown", onKeyDown);
      document.body.classList.remove("is-board-focus");
      host.removeAttribute("data-board-focus");
      document.body.style.cursor = "";
      envMap?.dispose();
      drawTex?.dispose();
      grain?.dispose();
      if (renderer) {
        renderer.dispose();
        renderer.domElement.remove();
      }
    };
  }, [scale, showDesk, docked]);

  return (
    <div
      ref={hostRef}
      className="retro-tv"
      data-ready={ready ? "true" : "false"}
      data-scale={scale === 1 ? undefined : String(scale)}
      data-dock={docked ? "footer" : undefined}
    >
      <span className="sr-only">
        {SHOW_WHITEBOARD && boardFocused
          ? "Whiteboard focused. Draw on the board. Click outside or press Escape to return. Double-click the board to erase."
          : on
            ? "Television playing. Click the TV to turn it off."
            : "Television is off. Click the TV to play."}
      </span>
    </div>
  );
}
