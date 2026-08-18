"use client";

import { useEffect, useRef, useState } from "react";
import type { Mesh, MeshStandardMaterial, Object3D } from "three";

const MODEL_URL = "/media/tv/hitachi-crt.glb";
const DESK_URL = "/media/tv/office-desk.glb";
const VIDEO_URL = "/media/tv/oogway-quote.mp4";
const SCREEN_OFF = "#050505";
/** Desktop: turn toward the page center from the bottom-right corner. */
const DESKTOP_YAW = -0.43;
/** Mobile: face the viewer a bit more, still sitting in the bottom-right. */
const MOBILE_YAW = -0.08;
const FRAME_MARGIN = 1.12;
const COMPACT_QUERY = "(max-width: 52rem)";
/** Assumed CRT width in meters, used to scale the 1.4m desk. */
const TV_WIDTH_M = 0.48;
/** Make the desk larger than a strictly real-world ratio to the CRT. */
const DESK_SCALE = 1.4;
/** Shift the TV toward the right side of the desk, as a fraction of desk width. */
const DESK_TV_RIGHT = 0.17;

function isCompactViewport() {
  return window.matchMedia(COMPACT_QUERY).matches;
}

/** Old canvas size, kept as the virtual film so the TV stays where it was. */
function viewSlot(host?: HTMLElement | null) {
  const vw = Math.max(1, host?.clientWidth || window.innerWidth);
  const vh = Math.max(1, host?.clientHeight || window.innerHeight);
  const compact = isCompactViewport();
  const slotW = compact
    ? Math.min(520, vw * 0.96)
    : Math.min(1040, vw * 0.88);
  const slotH = compact
    ? Math.min(360, vw * 0.78)
    : Math.min(480, vw * 0.5);
  return { vw, vh, slotW, slotH, compact };
}

function isPageUiTarget(event: Event) {
  const el = event.target;
  if (!(el instanceof Element)) return false;
  return Boolean(
    el.closest(".site, a, button, input, textarea, select, [role='button']"),
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

export default function RetroTV() {
  const hostRef = useRef<HTMLDivElement>(null);
  const playingRef = useRef(false);
  const [ready, setReady] = useState(false);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let disposed = false;
    let renderer: import("three").WebGLRenderer | undefined;
    let envMap: import("three").Texture | undefined;
    let frame = 0;
    let ro: ResizeObserver | undefined;
    let compactQuery: MediaQueryList | undefined;
    let onViewportChange: (() => void) | undefined;
    let loaderObs: MutationObserver | undefined;
    let visObs: IntersectionObserver | undefined;
    let loaderTimer = 0;
    let idleId = 0;
    let onClick: ((event: MouseEvent) => void) | undefined;
    let onPointerMove: ((event: PointerEvent) => void) | undefined;

    const fail = () => {
      host.dataset.skip = "true";
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

      const { vw, vh, slotW, slotH, compact } = viewSlot(host);
      const width = vw;
      const height = vh;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(24, slotW / slotH, 0.1, 2000);
      try {
        renderer = new THREE.WebGLRenderer({
          antialias: !compact,
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
      renderer.setPixelRatio(
        Math.min(window.devicePixelRatio, compact ? 1.25 : 1.75),
      );
      renderer.setSize(width, height, false);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 0.9;
      renderer.localClippingEnabled = false;
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      host.appendChild(renderer.domElement);

      if (!compact) {
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
      const key = new THREE.DirectionalLight(0xffebd4, compact ? 1.25 : 1.4);
      key.position.set(-2.8, 4.2, 3.4);
      key.castShadow = true;
      key.shadow.mapSize.set(compact ? 1024 : 2048, compact ? 1024 : 2048);
      key.shadow.bias = -0.0012;
      key.shadow.normalBias = 0.035;
      scene.add(key);
      scene.add(key.target);
      const fill = new THREE.DirectionalLight(0x8fa0b4, 0.22);
      fill.position.set(3.2, 1.2, 2.4);
      scene.add(fill);

      const loader = new GLTFLoader();
      const [gltf, deskGltf] = await Promise.all([
        loader.loadAsync(MODEL_URL),
        loader.loadAsync(DESK_URL),
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

      const desk = deskGltf.scene;
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

      model.updateWorldMatrix(true, true);
      const tvBox = new THREE.Box3().setFromObject(model);
      const tvSize = tvBox.getSize(new THREE.Vector3());
      desk.scale.setScalar((tvSize.x / TV_WIDTH_M) * DESK_SCALE);
      desk.updateWorldMatrix(true, true);
      const deskBox = new THREE.Box3().setFromObject(desk);
      const deskSize = deskBox.getSize(new THREE.Vector3());
      const deskCenter = deskBox.getCenter(new THREE.Vector3());
      const tvCenter = tvBox.getCenter(new THREE.Vector3());
      const rightShift = deskSize.x * DESK_TV_RIGHT;
      desk.position.x += tvCenter.x - rightShift - deskCenter.x;
      desk.position.y += tvBox.min.y - deskBox.max.y + tvSize.y * 0.01;
      desk.position.z += tvCenter.z - deskCenter.z;
      desk.updateWorldMatrix(true, true);
      const deskPlaced = new THREE.Box3().setFromObject(desk);

      const rig = new THREE.Group();
      rig.add(model);
      rig.add(desk);

      const floorSpan = Math.max(
        deskPlaced.max.x - deskPlaced.min.x,
        deskPlaced.max.z - deskPlaced.min.z,
      );
      const shadowFloor = new THREE.Mesh(
        new THREE.PlaneGeometry(floorSpan * 1.4, floorSpan * 1.4),
        new THREE.ShadowMaterial({ color: 0x000000, opacity: 0.2 }),
      );
      shadowFloor.rotation.x = -Math.PI / 2;
      shadowFloor.position.set(
        (deskPlaced.min.x + deskPlaced.max.x) / 2,
        deskPlaced.min.y + 0.04,
        (deskPlaced.min.z + deskPlaced.max.z) / 2,
      );
      shadowFloor.receiveShadow = true;
      shadowFloor.castShadow = false;
      rig.add(shadowFloor);
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
        const { vw: nextW, vh: nextH, slotW: filmW, slotH: filmH } =
          viewSlot(host);
        const tvFrame = new THREE.Box3().setFromObject(model);
        const deskFrame = new THREE.Box3().setFromObject(desk);
        const topY = tvFrame.max.y;
        const botY =
          deskFrame.max.y - (tvFrame.max.y - tvFrame.min.y) * 0.1;
        const viewH = Math.max(0.001, topY - botY) * FRAME_MARGIN;
        const fov = THREE.MathUtils.degToRad(camera.fov);
        let dist = viewH / 2 / Math.tan(fov / 2);

        const midX = tvFrame.getCenter(new THREE.Vector3()).x;
        const midY = (topY + botY) / 2;
        const midZ = tvFrame.getCenter(new THREE.Vector3()).z;

        camera.clearViewOffset();
        camera.aspect = filmW / filmH;
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

        camera.setViewOffset(
          filmW,
          filmH,
          filmW - nextW,
          filmH - nextH,
          nextW,
          nextH,
        );
        fitShadow();
      };
      frameRig();

      const screenAspect = 21.28 / 15.84;
      let videoTexture: import("three").VideoTexture | undefined;
      let crtMat: import("three").MeshBasicMaterial | undefined;
      let crtTime = { value: 0 };

      const paint = () => {
        renderer?.render(scene, camera);
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

      const hitsRig = (event: MouseEvent) => {
        const rect = renderer!.domElement.getBoundingClientRect();
        if (rect.width < 1 || rect.height < 1) return false;
        pointer.set(
          ((event.clientX - rect.left) / rect.width) * 2 - 1,
          -((event.clientY - rect.top) / rect.height) * 2 + 1,
        );
        raycaster.setFromCamera(pointer, camera);
        return raycaster.intersectObject(rig, true).length > 0;
      };

      onClick = (event: MouseEvent) => {
        if (isPageUiTarget(event) || !hitsRig(event)) return;
        if (playingRef.current) turnOff();
        else void turnOn();
      };

      onPointerMove = (event: PointerEvent) => {
        document.body.style.cursor =
          !isPageUiTarget(event) && hitsRig(event) ? "pointer" : "";
      };

      window.addEventListener("click", onClick);
      window.addEventListener("pointermove", onPointerMove);

      const resize = () => {
        if (!renderer || disposed) return;
        const { vw: nextW, vh: nextH, compact: compactNow } = viewSlot(host);
        rig.rotation.y = compactNow ? MOBILE_YAW : DESKTOP_YAW;
        frameRig();
        renderer.setPixelRatio(
          Math.min(window.devicePixelRatio, compactNow ? 1.25 : 1.75),
        );
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
      document.body.style.cursor = "";
      envMap?.dispose();
      if (renderer) {
        renderer.dispose();
        renderer.domElement.remove();
      }
    };
  }, []);

  return (
    <div
      ref={hostRef}
      className="retro-tv"
      data-ready={ready ? "true" : "false"}
    >
      <span className="sr-only">
        {on
          ? "Television playing. Click the TV to turn it off."
          : "Television is off. Click the TV to play."}
      </span>
    </div>
  );
}
