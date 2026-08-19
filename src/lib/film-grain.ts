import type { WebGLRenderer } from "three";

/** How strong the overlay is. Higher reads more like old film. */
export const FILM_GRAIN_AMOUNT = 0.085;

export function createFilmGrain(THREE: typeof import("three"), amount = FILM_GRAIN_AMOUNT) {
  const uAmount = { value: amount };
  const uTime = { value: 0 };
  const material = new THREE.ShaderMaterial({
    transparent: true,
    depthTest: false,
    depthWrite: false,
    toneMapped: false,
    blending: THREE.CustomBlending,
    blendEquation: THREE.AddEquation,
    blendSrc: THREE.DstAlphaFactor,
    blendDst: THREE.OneFactor,
    blendSrcAlpha: THREE.ZeroFactor,
    blendDstAlpha: THREE.OneFactor,
    uniforms: { uAmount, uTime },
    vertexShader: `
      void main() {
        gl_Position = vec4(position.xy, 0.0, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uAmount;
      uniform float uTime;
      float hash(vec2 p) {
        vec3 p3 = fract(vec3(p.xyx) * 0.1031);
        p3 += dot(p3, p3.yzx + 33.33);
        return fract((p3.x + p3.y) * p3.z);
      }
      void main() {
        vec2 uv = gl_FragCoord.xy + vec2(uTime * 37.0, uTime * 19.0);
        float n = hash(uv) * 0.62 + hash(uv * 0.41 + 17.2) * 0.38;
        float g = (n - 0.5) * uAmount;
        gl_FragColor = vec4(g, g, g, 0.0);
      }
    `,
  });
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
  mesh.frustumCulled = false;
  const grainScene = new THREE.Scene();
  const grainCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  grainScene.add(mesh);

  return {
    render(renderer: WebGLRenderer) {
      uTime.value = performance.now() * 0.00015;
      const prevAuto = renderer.autoClear;
      renderer.autoClear = false;
      renderer.render(grainScene, grainCam);
      renderer.autoClear = prevAuto;
    },
    dispose() {
      material.dispose();
      mesh.geometry.dispose();
    },
  };
}
