"use client";

import { useEffect, useRef } from "react";
import {
  ANNOTATION_2_EYE,
  ANNOTATION_2_TARGET,
  ANNOTATION_2_UP,
  FOREST_CLEAR,
  FOREST_FOG,
  FOREST_FOG_DENSITY,
  FOREST_FOV,
  FOREST_URL,
  LEAF_SWAY_AMP,
  LEAF_SWAY_SPEED,
  SUNSET_GROUND,
  SUNSET_HORIZON,
  SUNSET_MID,
  SUNSET_TOP,
} from "@/lib/forest-settings";
import { createFilmGrain } from "@/lib/film-grain";

function shouldSkipForest() {
  const connection = (
    navigator as Navigator & {
      connection?: { saveData?: boolean };
    }
  ).connection;
  return Boolean(connection?.saveData);
}

export default function ForestBackground() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let disposed = false;
    let renderer: import("three").WebGLRenderer | undefined;
    let scene: import("three").Scene | undefined;
    let frame = 0;
    let loaderObs: MutationObserver | undefined;
    let loaderTimer = 0;
    let idleId = 0;
    let ro: ResizeObserver | undefined;
    let onVis: (() => void) | undefined;
    let grain: ReturnType<typeof createFilmGrain> | undefined;

    const dropRenderer = () => {
      grain?.dispose();
      grain = undefined;
      if (scene) {
        scene.traverse((obj) => {
          const mesh = obj as import("three").Mesh;
          if (!mesh.isMesh) return;
          mesh.geometry.dispose();
          const mats = Array.isArray(mesh.material)
            ? mesh.material
            : [mesh.material];
          for (const mat of mats) mat.dispose();
        });
        scene = undefined;
      }
      if (renderer) {
        renderer.dispose();
        renderer.domElement.remove();
        renderer = undefined;
      }
    };

    const fail = () => {
      host.dataset.skip = "true";
      dropRenderer();
    };

    const boot = async () => {
      if (shouldSkipForest()) {
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
          idleId = requestIdleCallback(() => resolve(), { timeout: 1800 });
          return;
        }
        idleId = window.setTimeout(resolve, 400);
      });
      if (disposed) return;

      const THREE = await import("three");
      const [{ GLTFLoader }, { MeshoptDecoder }] = await Promise.all([
        import("three/addons/loaders/GLTFLoader.js"),
        import("three/addons/libs/meshopt_decoder.module.js"),
      ]);
      if (disposed) return;

      const width = Math.max(1, host.clientWidth || window.innerWidth);
      const height = Math.max(1, host.clientHeight || window.innerHeight);
      scene = new THREE.Scene();
      scene.background = new THREE.Color(FOREST_FOG);
      scene.fog = new THREE.FogExp2(FOREST_FOG, FOREST_FOG_DENSITY);

      const camera = new THREE.PerspectiveCamera(
        FOREST_FOV,
        width / height,
        0.4,
        2000,
      );
      camera.up.fromArray(ANNOTATION_2_UP);
      camera.position.fromArray(ANNOTATION_2_EYE);
      camera.lookAt(
        ANNOTATION_2_TARGET[0],
        ANNOTATION_2_TARGET[1],
        ANNOTATION_2_TARGET[2],
      );

      try {
        renderer = new THREE.WebGLRenderer({
          antialias: false,
          alpha: false,
          powerPreference: "low-power",
          failIfMajorPerformanceCaveat: false,
        });
      } catch {
        fail();
        return;
      }
      if (disposed) {
        dropRenderer();
        return;
      }

      renderer.setClearColor(FOREST_FOG, 1);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 0.85));
      renderer.setSize(width, height, false);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.32;
      renderer.shadowMap.enabled = false;
      host.appendChild(renderer.domElement);

      scene.add(new THREE.HemisphereLight(0xf3f4ee, 0x667056, 1.12));
      const sun = new THREE.DirectionalLight(0xfff4e0, 1.9);
      sun.position.set(-10, 92, -42);
      scene.add(sun);

      const sky = new THREE.Mesh(
        new THREE.SphereGeometry(1, 24, 16),
        new THREE.ShaderMaterial({
          side: THREE.BackSide,
          depthWrite: false,
          fog: false,
          uniforms: {
            uTop: { value: new THREE.Color(SUNSET_TOP) },
            uMid: { value: new THREE.Color(SUNSET_MID) },
            uHorizon: { value: new THREE.Color(SUNSET_HORIZON) },
            uGround: { value: new THREE.Color(SUNSET_GROUND) },
            uCenter: { value: camera.position.clone() },
          },
          vertexShader: `
            varying vec3 vWorldPos;
            void main() {
              vec4 world = modelMatrix * vec4(position, 1.0);
              vWorldPos = world.xyz;
              gl_Position = projectionMatrix * viewMatrix * world;
            }
          `,
          fragmentShader: `
            uniform vec3 uTop;
            uniform vec3 uMid;
            uniform vec3 uHorizon;
            uniform vec3 uGround;
            uniform vec3 uCenter;
            varying vec3 vWorldPos;
            void main() {
              float h = normalize(vWorldPos - uCenter).y;
              vec3 col = mix(uGround, uHorizon, smoothstep(-0.28, 0.04, h));
              col = mix(col, uMid, smoothstep(0.0, 0.24, h));
              col = mix(col, uTop, smoothstep(0.16, 0.72, h));
              gl_FragColor = vec4(col, 1.0);
              #include <colorspace_fragment>
            }
          `,
        }),
      );
      sky.scale.setScalar(900);
      sky.position.copy(camera.position);
      sky.frustumCulled = false;
      sky.renderOrder = -1;
      sky.raycast = () => {};
      scene.add(sky);

      if (MeshoptDecoder.ready) await MeshoptDecoder.ready;
      if (disposed) {
        dropRenderer();
        return;
      }

      const loader = new GLTFLoader();
      loader.setMeshoptDecoder(MeshoptDecoder);
      const gltf = await new Promise<{ scene: import("three").Group }>(
        (resolve, reject) => {
          loader.load(FOREST_URL, resolve, undefined, reject);
        },
      );
      if (disposed) {
        gltf.scene.traverse((obj) => {
          const mesh = obj as import("three").Mesh;
          if (!mesh.isMesh) return;
          mesh.geometry.dispose();
        });
        dropRenderer();
        return;
      }

      const forestRoot = gltf.scene;
      forestRoot.traverse((obj) => {
        obj.frustumCulled = true;
        const mesh = obj as import("three").Mesh;
        if (!mesh.isMesh) return;
        const mats = Array.isArray(mesh.material)
          ? mesh.material
          : [mesh.material];
        for (const mat of mats) {
          if (!/grass/i.test(mat.name)) continue;
          mat.transparent = false;
          mat.depthWrite = true;
          mat.alphaTest = Math.max(mat.alphaTest || 0, 0.4);
          mat.needsUpdate = true;
        }
      });
      scene.add(forestRoot);

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const uTime = { value: 0 };
      const leafMats: import("three").Material[] = [];

      if (!reduceMotion) {
        const bindSway = (mat: import("three").Material) => {
          if (leafMats.includes(mat)) return;
          leafMats.push(mat);
          const swayMat = mat as import("three").MeshStandardMaterial;
          swayMat.customProgramCacheKey = () => "willow-leaf-sway";
          swayMat.onBeforeCompile = (shader) => {
            shader.uniforms.uTime = uTime;
            shader.uniforms.uSway = { value: LEAF_SWAY_AMP };
            shader.uniforms.uWind = { value: LEAF_SWAY_SPEED };
            shader.vertexShader = shader.vertexShader
              .replace(
                "#include <common>",
                `#include <common>
uniform float uTime;
uniform float uSway;
uniform float uWind;`,
              )
              .replace(
                "#include <begin_vertex>",
                `#include <begin_vertex>
{
  float phase = transformed.x * 0.33 + transformed.z * 0.27 + transformed.y * 0.18;
  float gust = sin(uTime * uWind + phase);
  float rustle = sin(uTime * uWind * 2.05 + phase * 2.3);
  transformed += vec3(
    (gust * 0.85 + rustle * 0.2) * uSway,
    rustle * uSway * 0.14,
    (gust * 0.4 + rustle * 0.15) * uSway
  );
}`,
              );
          };
          swayMat.needsUpdate = true;
        };

        const candidates: import("three").Material[] = [];
        forestRoot.traverse((obj) => {
          const mesh = obj as import("three").Mesh;
          if (!mesh.isMesh) return;
          const mats = Array.isArray(mesh.material)
            ? mesh.material
            : [mesh.material];
          for (const mat of mats) {
            if (/grass/i.test(mat.name)) continue;
            if (/verion|leaf/i.test(mat.name)) bindSway(mat);
            else candidates.push(mat);
          }
        });
        if (!leafMats.length) {
          for (const mat of candidates) {
            const std = mat as import("three").MeshStandardMaterial;
            if (std.alphaTest > 0.01) bindSway(mat);
          }
        }
      }

      const clock = new THREE.Clock();
      grain = createFilmGrain(THREE);
      const paint = () => {
        if (!renderer || !scene || disposed) return;
        renderer.render(scene, camera);
        grain?.render(renderer);
      };

      const tick = () => {
        if (disposed || document.hidden) return;
        if (leafMats.length) uTime.value = clock.getElapsedTime();
        paint();
        if (leafMats.length) frame = window.requestAnimationFrame(tick);
      };
      const kick = () => {
        window.cancelAnimationFrame(frame);
        frame = window.requestAnimationFrame(tick);
      };

      const resize = () => {
        if (!renderer || disposed) return;
        const nextW = Math.max(1, host.clientWidth || window.innerWidth);
        const nextH = Math.max(1, host.clientHeight || window.innerHeight);
        camera.aspect = nextW / nextH;
        camera.updateProjectionMatrix();
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 0.85));
        renderer.setSize(nextW, nextH, false);
        kick();
      };

      ro = new ResizeObserver(resize);
      ro.observe(host);
      onVis = () => {
        if (document.hidden) {
          window.cancelAnimationFrame(frame);
          return;
        }
        kick();
      };
      document.addEventListener("visibilitychange", onVis);
      kick();
      host.dataset.ready = "true";
    };

    void boot().catch(() => {
      fail();
    });

    return () => {
      disposed = true;
      window.cancelAnimationFrame(frame);
      window.clearTimeout(loaderTimer);
      window.clearTimeout(idleId);
      if (typeof cancelIdleCallback === "function") {
        cancelIdleCallback(idleId);
      }
      loaderObs?.disconnect();
      ro?.disconnect();
      if (onVis) document.removeEventListener("visibilitychange", onVis);
      dropRenderer();
    };
  }, []);

  return (
    <div
      ref={hostRef}
      className="forest-bg"
      aria-hidden="true"
      style={{ background: FOREST_CLEAR }}
    />
  );
}
