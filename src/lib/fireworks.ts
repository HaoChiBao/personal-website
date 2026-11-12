/**
 * ASCII fireworks from HaoChiBao/fireworks, at that page's default settings.
 * Screen: columns 302, height 1.7. Each shell uses its own defaults:
 * size 0.4, arms 54, gravity 1.35 (pom pom 0.25), asymmetry 0.75,
 * noise 0.6, fade 0.35, climb 0.5. Glow stays off.
 * The sky is not painted, so the site background shows through.
 */

import { quantizeRgb } from "@/lib/fireworks-color";
import { clearLitCells, paintCells, useFillTextPaint } from "@/lib/fireworks-draw";
import { pompomChar, pompomCount } from "@/lib/fireworks-pompom";
import { fireworkQuality, type FireworkQuality } from "@/lib/fireworks-quality";

const BANDS = [
  [".", "`", "'", ","],
  ["-", ";", "^", "_", "'"],
  [")", "!", "[", "]", "(", "+"],
  ["=", "/", "\\", "*", "^", "+"],
  ["Y", "y", "x", "Z", "$", "z", "7", "1"],
  ["5", "%", "9", "#", "4", "8", "*", "Z"],
  ["8", "0", "@", "#", "%", "X"],
] as const;

const SCREEN = {
  columns: 302,
  aspect: 1.7,
};

type ShellKind = "original" | "pompom" | "crossette";

type ShellSpec = {
  size: number;
  arms: number;
  gravity: number;
  asymmetry: number;
  noise: number;
  fade: number;
  rise: number;
};

function freshShell(): ShellSpec {
  return {
    size: 0.4,
    arms: 54,
    gravity: 1.35,
    asymmetry: 0.75,
    noise: 0.6,
    fade: 0.35,
    rise: 0.5,
  };
}

const SHELLS: Record<ShellKind, ShellSpec> = {
  original: freshShell(),
  pompom: { ...freshShell(), gravity: 0.25 },
  crossette: freshShell(),
};

const KINDS: ShellKind[] = ["original", "pompom", "crossette"];

const COLOR_PAIRS: Array<[[number, number, number], [number, number, number]]> = [
  [[2, 100, 52], [28, 100, 52]],
  [[50, 100, 52], [78, 100, 48]],
  [[126, 100, 46], [156, 95, 48]],
  [[208, 100, 58], [246, 95, 62]],
];

type Rgb = [number, number, number];
type Scheme = { rainbow: boolean; colors: [Rgb, Rgb] | null };

type Glyph = {
  x: number;
  y: number;
  ch: string;
  rgb: Rgb;
  twinkle: number;
  dieAt: number;
};

type Spark = {
  x: number;
  y: number;
  ovx: number;
  ovy: number;
  zDir: number;
  vx: number;
  vy: number;
  age: number;
  life: number;
  grav: number;
  size: number;
  kind: ShellKind;
  core: boolean;
  wobble: number;
  glyphs: Glyph[];
  last: { x: number; y: number } | null;
  falling: boolean;
  burning: boolean;
  fadeArmed: boolean;
  crackAt: number;
  cracked: boolean;
  thin: boolean;
  color: Rgb;
};

type Rocket = {
  x: number;
  y: number;
  tx: number;
  ty: number;
  scheme: Scheme;
  size: number;
  kind: ShellKind;
  age: number;
  dur: number;
  phase: "rise" | "gone";
  hold: number;
  sway: number;
  sway2: number;
  trail: Array<{ x: number; y: number }>;
  trailStart: number;
  tip: { x: number; y: number } | null;
};

type Sprite = {
  atlas: HTMLCanvasElement;
  sx: number;
  sy: number;
  sw: number;
  sh: number;
  ox: number;
  oy: number;
  cssW: number;
  cssH: number;
  gen: number;
};

const ATLAS = 1024;

export type FireworksHandle = {
  launch: (x: number, y: number) => void;
  sparkCount: () => number;
  litCells: () => number;
  stop: () => void;
};

export function startFireworks(canvas: HTMLCanvasElement): FireworksHandle {
  const maybeCtx = canvas.getContext("2d", { alpha: true });
  if (!maybeCtx) return { launch() {}, sparkCount: () => 0, litCells: () => 0, stop() {} };
  const ctx: CanvasRenderingContext2D = maybeCtx;

  let cssW = 0;
  let cssH = 0;
  let cellW = 10;
  let cellH = 18;
  let cols = 0;
  let rows = 0;
  let energy = new Float32Array(0);
  let glyphs: Array<string | undefined> = [];
  let colors = new Uint32Array(0);
  let viewScale = 1;
  let fontCss = "";
  const lit: number[] = [];
  let litCount = 0;
  const glyphCache = new Map<number, Map<string, Sprite>>();
  let cacheGen = 0;
  let atlasPages: HTMLCanvasElement[] = [];
  let atlasCtxs: CanvasRenderingContext2D[] = [];
  let atlasIndex = -1;
  let atlasX = 0;
  let atlasY = 0;
  let atlasRowH = 0;
  let scratch: HTMLCanvasElement | null = null;
  let scratchCtx: CanvasRenderingContext2D | null = null;

  const rockets: Rocket[] = [];
  const sparks: Spark[] = [];
  let last = 0;
  let frameId = 0;
  let running = false;
  let paused = false;
  let quality: FireworkQuality = fireworkQuality(1, 1);

  function layout() {
    const nextW = canvas.clientWidth;
    const nextH = canvas.clientHeight;
    if (nextW < 1 || nextH < 1) return;
    quality = fireworkQuality(nextW, window.devicePixelRatio || 1);
    const nextScale = quality.maxDpr;
    if (nextW === cssW && nextH === cssH && nextScale === viewScale && cols === quality.columns && cols > 0) return;

    viewScale = nextScale;
    cssW = nextW;
    cssH = nextH;
    canvas.width = Math.max(1, Math.floor(cssW * viewScale));
    canvas.height = Math.max(1, Math.floor(cssH * viewScale));
    ctx.setTransform(viewScale, 0, 0, viewScale, 0, 0);

    cols = Math.max(1, quality.columns);
    cellW = cssW / cols;
    cellH = cellW * SCREEN.aspect;
    rows = Math.max(1, Math.round(cssH / cellH));
    cellH = cssH / rows;

    energy = new Float32Array(cols * rows);
    glyphs = new Array(cols * rows);
    colors = new Uint32Array(cols * rows);
    litCount = 0;
    fontCss = `${Math.max(7, Math.floor(cellH * 0.92))}px Consolas, "Courier New", monospace`;
    ctx.font = fontCss;
    ctx.textBaseline = "top";
    ctx.textAlign = "left";
    resetAtlas();
    ctx.clearRect(0, 0, cssW, cssH);
  }

  function noteLit(i: number) {
    if (litCount < lit.length) lit[litCount] = i;
    else lit.push(i);
    litCount += 1;
  }

  function dropAt<T>(list: T[], i: number) {
    const lastIndex = list.length - 1;
    const item = list.pop();
    if (i < lastIndex && item !== undefined) {
      list[i] = item;
      return true;
    }
    return false;
  }

  function pack(rgb: Rgb) {
    const quantized = quantizeRgb(rgb);
    return (quantized[0] << 16) | (quantized[1] << 8) | quantized[2];
  }

  function stamp(x: number, y: number, e: number, rgb: Rgb) {
    if (e <= 0) return;
    const c = (x / cellW) | 0;
    const r = (y / cellH) | 0;
    if (c < 0 || r < 0 || c >= cols || r >= rows) return;
    const i = r * cols + c;
    if (energy[i] > 0) return;
    energy[i] = e;
    const band = Math.min(BANDS.length - 1, (e * BANDS.length) | 0);
    const set = BANDS[band];
    glyphs[i] = set[(Math.random() * set.length) | 0];
    colors[i] = pack(rgb);
    noteLit(i);
  }

  function stampChar(x: number, y: number, ch: string, rgb: Rgb, rank: number) {
    const c = (x / cellW) | 0;
    const r = (y / cellH) | 0;
    if (c < 0 || r < 0 || c >= cols || r >= rows) return;
    const i = r * cols + c;
    if (energy[i] >= rank) return;
    const fresh = energy[i] <= 0;
    energy[i] = rank;
    glyphs[i] = ch;
    colors[i] = pack(rgb);
    if (fresh) noteLit(i);
  }

  function glyphChar(zDir: number) {
    if (zDir > 0.2) return BANDS[0][(Math.random() * BANDS[0].length) | 0];
    const set = BANDS[2 + ((Math.random() * (BANDS.length - 2)) | 0)];
    return set[(Math.random() * set.length) | 0];
  }

  function hsl(h: number, s: number, l: number): Rgb {
    s /= 100;
    l /= 100;
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const hp = ((((h % 360) + 360) % 360) / 60);
    const x = c * (1 - Math.abs((hp % 2) - 1));
    let r = 0;
    let g = 0;
    let b = 0;
    if (hp < 1) {
      r = c;
      g = x;
    } else if (hp < 2) {
      r = x;
      g = c;
    } else if (hp < 3) {
      g = c;
      b = x;
    } else if (hp < 4) {
      g = x;
      b = c;
    } else if (hp < 5) {
      r = x;
      b = c;
    } else {
      r = c;
      b = x;
    }
    const m = l - c / 2;
    return [Math.round((r + m) * 255), Math.round((g + m) * 255), Math.round((b + m) * 255)];
  }

  function pickScheme(): Scheme {
    if (Math.random() < 0.14) return { rainbow: true, colors: null };
    const pair = COLOR_PAIRS[(Math.random() * COLOR_PAIRS.length) | 0];
    return {
      rainbow: false,
      colors: [hsl(pair[0][0], pair[0][1], pair[0][2]), hsl(pair[1][0], pair[1][1], pair[1][2])],
    };
  }

  function sparkRgb(scheme: Scheme, angle: number, slot: number): Rgb {
    if (scheme.rainbow) {
      const hue = ((angle + Math.PI) / (Math.PI * 2)) * 360;
      return hsl(hue, 88, 60);
    }
    return scheme.colors![slot % 2];
  }

  let kindCursor = 0;

  function nextKind(): ShellKind {
    const kind = KINDS[kindCursor % KINDS.length];
    kindCursor += 1;
    return kind;
  }

  function shellOf(kind: ShellKind) {
    return SHELLS[kind];
  }

  function reachFor(kind: ShellKind) {
    return Math.max(0.35, rows / 32) * shellOf(kind).size;
  }

  function pickSize() {
    const t = (Math.random() + Math.random()) / 2;
    return 0.5 + t * 1.15;
  }

  function addSpark(
    x: number,
    y: number,
    ang: number,
    speed: number,
    life: number,
    grav: number,
    color: Rgb,
    zDir: number,
    size: number,
    kind: ShellKind,
    core: boolean,
  ) {
    const z = zDir || 0;
    const ring = Math.sqrt(Math.max(0, 1 - z * z));
    const depthScale = z > 0 ? 1 / (1 + 0.9 * z) : 1;
    const screen = speed * ring * depthScale;
    sparks.push({
      x,
      y,
      ovx: Math.cos(ang) * screen,
      ovy: Math.sin(ang) * screen,
      zDir: z,
      vx: 0,
      vy: 0,
      age: 0,
      life,
      grav,
      size: size || 1,
      kind,
      core,
      wobble: (Math.random() - 0.5) * 0.6 * (shellOf(kind).noise / 0.6),
      glyphs: [],
      last: null,
      falling: false,
      burning: false,
      fadeArmed: false,
      crackAt: 0,
      cracked: false,
      thin: false,
      color,
    });
  }

  function explode(x: number, y: number, scheme: Scheme, scale: number, kind: ShellKind) {
    const size = scale > 0 ? scale : 1;
    const spec = shellOf(kind);
    const reach = reachFor(kind) * size;
    const asym = spec.asymmetry;

    if (kind === "pompom") {
      const count = pompomCount(spec.arms, size, quality.pompomDensity);
      const golden = Math.PI * (3 - Math.sqrt(5));
      for (let i = 0; i < count; i++) {
        const y3 = 1 - ((i + 0.5) / count) * 2;
        const ring = Math.sqrt(Math.max(0, 1 - y3 * y3));
        const theta = golden * i;
        const x3 = Math.cos(theta) * ring;
        const z3 = Math.sin(theta) * ring;
        const jitter = 1 + (Math.random() - 0.5) * 0.06;
        const speed = (40 + Math.random() * 4) * jitter * cellH * reach;
        const aim = Math.atan2(-y3, x3 || 0.0001);
        addSpark(x, y, aim, speed, 2.4 + Math.random() * 0.4, 1, sparkRgb(scheme, aim, i), z3, size, kind, false);
      }
      return;
    }

    if (kind === "crossette") {
      const rays = Math.max(6, Math.round(spec.arms * size * 0.3 * quality.rayScale));
      let ang = Math.random() * Math.PI * 2;
      const stepAng = (Math.PI * 2) / rays;
      for (let i = 0; i < rays; i++) {
        ang += stepAng;
        const aim = ang + (Math.random() - 0.5) * stepAng * (0.25 + asym * 0.35);
        const stretch = 0.92 + Math.random() * (0.1 + asym * 0.08);
        const speed = (18 + Math.random() * 5) * stretch * cellH * reach;
        const life = 2.4 + Math.random() * 0.15;
        addSpark(x, y, aim, speed, life, 0.85, sparkRgb(scheme, aim, i), 0, size, kind, false);
        sparks[sparks.length - 1].crackAt = 0.9 + Math.random() * 0.28;
      }
      return;
    }

    const rays = Math.max(4, Math.round(spec.arms * size * quality.rayScale));
    let ang = Math.random() * Math.PI * 2;
    const stepAng = (Math.PI * 2) / rays;
    for (let i = 0; i < rays; i++) {
      ang += stepAng;
      const aim = ang + (Math.random() - 0.5) * stepAng * (0.35 + asym * 0.5);
      const stretch = 0.9 + Math.random() * (0.2 + asym * 0.15);
      const speed = (38 + Math.random() * 14) * stretch * cellH * reach;
      const life = 2.2 + Math.random() * 0.7;
      const grav = 0.72 + Math.random() * 0.28;
      const zDir = i % 3 === 1 ? 0.6 : i % 3 === 2 ? -0.6 : 0;
      addSpark(x, y, aim, speed, life, grav, sparkRgb(scheme, aim, i), zDir, size, kind, false);
    }
    const fuzz = Math.max(6, Math.round(rays * 0.42));
    for (let i = 0; i < fuzz; i++) {
      const aim = Math.random() * Math.PI * 2;
      const speed = (4 + Math.random() * 11) * cellH * reach;
      const zDir = i % 2 === 0 ? 0.45 : -0.45;
      addSpark(x, y, aim, speed, 0.75 + Math.random() * 0.55, 0.35 + Math.random() * 0.3, sparkRgb(scheme, aim, i), zDir, size, kind, true);
    }
  }

  function rocketColor(rocket: Rocket): Rgb {
    if (rocket.scheme.rainbow) {
      const hue = Math.round(((rocket.age * 280) % 360) / 2) * 2;
      return hsl(hue, 88, 62);
    }
    return rocket.scheme.colors![0];
  }

  function fadeMul(kind: ShellKind) {
    return 1.35 - shellOf(kind).fade;
  }

  function dieTime(s: Spark, index: number, total: number) {
    const span = Math.max(0.3, s.life - s.age) * fadeMul(s.kind);
    const youth = index / Math.max(1, total - 1);
    const t = Math.pow(Math.random(), 0.55) * (0.2 + 0.68 * youth);
    return s.age + Math.max(0.04, t) * span;
  }

  function pushGlyph(s: Spark, x: number, y: number, rgb: Rgb) {
    let dieAt = Infinity;
    if (s.kind === "original" && s.falling) {
      const span = Math.max(0.2, s.life - s.age) * fadeMul(s.kind);
      dieAt = s.age + (0.05 + Math.random() * 0.28) * span;
    } else if (s.fadeArmed) {
      const span = Math.max(0.2, s.life - s.age) * fadeMul(s.kind);
      dieAt = s.age + (0.45 + Math.random() * 0.55) * span;
    }
    const noise = s.thin ? 0 : shellOf(s.kind).noise / 0.6;
    const thinChars = ".-'";
    s.glyphs.push({
      x: x + (Math.random() - 0.5) * cellW * 0.18 * noise,
      y: y + (Math.random() - 0.5) * cellH * 0.12 * noise,
      ch: s.thin ? thinChars[(Math.random() * thinChars.length) | 0] : glyphChar(s.zDir),
      rgb,
      twinkle: Math.random() * Math.PI * 2,
      dieAt,
    });
  }

  function beginFall(s: Spark) {
    s.falling = true;
    const total = Math.max(1, s.glyphs.length);
    for (let i = 0; i < s.glyphs.length; i++) {
      if (s.glyphs[i].dieAt < Infinity) continue;
      s.glyphs[i].dieAt = dieTime(s, i, total);
    }
  }

  function armFade(s: Spark) {
    if (s.fadeArmed || s.age <= s.life * 0.8) return;
    s.fadeArmed = true;
    const total = s.glyphs.length;
    const window = Math.max(0.05, (s.life - s.age) * fadeMul(s.kind));
    for (let i = 0; i < total; i++) {
      const along = total <= 1 ? 1 : i / (total - 1);
      s.glyphs[i].dieAt = s.age + window * (0.06 + 0.94 * along);
    }
  }

  function crackCrossette(s: Spark) {
    s.cracked = true;
    s.crackAt = 0;
    const heading = Math.atan2(s.vy, s.vx);
    const split = Math.max(cellH * 18, Math.hypot(s.vx, s.vy) * 0.9);
    const drift = 0.16;
    const span = 0.65 + shellOf(s.kind).asymmetry * 0.55;
    const order = [0, 1, 2, 3];
    for (let i = order.length - 1; i > 0; i--) {
      const j = (Math.random() * (i + 1)) | 0;
      const swap = order[i];
      order[i] = order[j];
      order[j] = swap;
    }
    const reach = [0.5, 0.78, 1.12, 1.58];
    for (let n = 0; n < 4; n++) {
      const aim = heading + order[n] * (Math.PI / 2);
      const scale = 1 + (reach[n] - 1) * span;
      const vx = s.vx * drift + Math.cos(aim) * split * scale;
      const vy = s.vy * drift + Math.sin(aim) * split * scale;
      addSpark(s.x, s.y, Math.atan2(vy, vx), Math.hypot(vx, vy), 0.46 + 0.34 * scale, 0.4, s.color, 0, s.size, "crossette", true);
      sparks[sparks.length - 1].thin = true;
    }
    s.vx = 0;
    s.vy = 0;
    s.grav = 0;
    s.life = s.age + 0.4;
    s.fadeArmed = true;
    const total = s.glyphs.length;
    const fadeWindow = 0.34 * fadeMul(s.kind);
    for (let i = 0; i < total; i++) {
      const along = total <= 1 ? 1 : i / (total - 1);
      s.glyphs[i].dieAt = s.age + fadeWindow * (0.2 + 0.8 * along);
    }
  }

  function layGlyphs(s: Spark, x0: number, y0: number, x1: number, y1: number, gap: number) {
    const dx = x1 - x0;
    const dy = y1 - y0;
    const len = Math.hypot(dx, dy) || 1;
    const rgb = s.color;
    const steps = Math.max(1, Math.ceil(len / gap));
    for (let t = 1; t <= steps; t++) {
      const u = t / steps;
      pushGlyph(s, x0 + dx * u, y0 + dy * u, rgb);
    }
  }

  function step(dt: number) {
    for (let i = rockets.length - 1; i >= 0; i--) {
      const r = rockets[i];
      if (r.phase === "gone") {
        r.hold -= dt;
        if (r.hold <= 0) {
          explode(r.tx, r.ty, r.scheme, r.size, r.kind);
          if (dropAt(rockets, i)) i += 1;
        }
        continue;
      }
      r.age += dt * Math.max(0.2, shellOf(r.kind).rise || 1);
      const t = Math.min(1, r.age / r.dur);
      const ease = 1 - Math.pow(1 - t, 3);
      const y = r.y + (r.ty - r.y) * ease;
      const bend = Math.sin(t * Math.PI * 2 * 1.35 + r.sway) * 0.7 + Math.sin(t * Math.PI * 2 * 2.6 + r.sway2) * 0.3;
      const envelope = Math.sin(Math.min(1, t / 0.14) * Math.PI * 0.5) * Math.min(1, (1 - t) / 0.2);
      const x = r.tx + bend * cellW * 5.5 * envelope;
      const prev = r.tip;
      if (!prev || Math.abs(y - prev.y) > cellH * 0.7 || Math.abs(x - prev.x) > cellW * 0.75) {
        r.trail.push({ x, y });
        r.tip = { x, y };
      }
      const speedFrac = (1 - t) * (1 - t);
      const tail = Math.round(84 * speedFrac * r.size);
      let start = r.trailStart;
      while (r.trail.length - start > tail) start += 1;
      if (start > 48) {
        r.trail.splice(0, start);
        start = 0;
      }
      r.trailStart = start;
      if (t >= 1) {
        r.phase = "gone";
        r.hold = 0.16;
        r.trail.length = 0;
        r.trailStart = 0;
        continue;
      }
      const head = rocketColor(r);
      const n = r.trail.length - start;
      for (let k = 0; k < n; k++) {
        const p = r.trail[start + k];
        const e = k === n - 1 ? 1 : 0.28 + 0.45 * (k / n);
        stamp(p.x, p.y, e, head);
      }
    }

    const gap = Math.min(cellW, cellH) * quality.glyphGap;
    for (let i = sparks.length - 1; i >= 0; i--) {
      const s = sparks[i];
      s.age += dt;
      if (s.y > cssH + cellH * 4) {
        if (dropAt(sparks, i)) i += 1;
        continue;
      }
      if (!s.cracked) {
        if (!s.burning) {
          s.vx = s.ovx;
          s.vy = s.ovy;
          s.burning = true;
        }
        const sp0 = Math.hypot(s.vx, s.vy);
        const drag = 2.4 + sp0 * 0.0032;
        s.vx *= Math.exp(-drag * dt);
        s.vy *= Math.exp(-drag * dt);
        const launchSpeed = Math.hypot(s.ovx, s.ovy) || 1;
        const spec = shellOf(s.kind);
        const g = 16 * cellH * reachFor(s.kind) * spec.gravity;
        let gravGate = 0.62;
        if (s.kind === "pompom") gravGate = Infinity;
        else if (s.kind === "crossette" && !s.core) gravGate = 0;
        if (sp0 < launchSpeed * gravGate) s.vy += g * s.grav * s.size * dt;
        const sp = Math.hypot(s.vx, s.vy) || 1;
        if (s.kind !== "pompom" && !(s.kind === "crossette" && s.core)) {
          s.wobble += (Math.random() - 0.5) * 7 * (spec.noise / 0.6) * dt;
          s.wobble *= Math.exp(-2.4 * dt);
          const shove = s.wobble * cellH * 0.9 * dt;
          const px = -s.vy / sp;
          const py = s.vx / sp;
          s.vx += px * shove;
          s.vy += py * shove;
        }
        s.x += s.vx * dt;
        s.y += s.vy * dt;
        if (s.kind === "original" || s.kind === "pompom") {
          const coasting = sp < launchSpeed * 0.42 && s.vy > cellH * 0.5 && s.age > 0.34;
          if (s.burning && !s.falling && (coasting || s.age > s.life * 0.5)) beginFall(s);
        } else {
          armFade(s);
        }
        if (s.kind === "pompom") {
          const glyph = s.glyphs[0];
          if (glyph) {
            glyph.x = s.x;
            glyph.y = s.y;
          } else if (!s.falling) {
            pushGlyph(s, s.x, s.y, s.color);
          }
        } else {
          const prev = s.last;
          const stride = s.thin ? Math.max(cellW, cellH) : gap;
          if (!prev || Math.hypot(s.x - prev.x, s.y - prev.y) >= stride) {
            if (prev) layGlyphs(s, prev.x, prev.y, s.x, s.y, stride);
            s.last = { x: s.x, y: s.y };
          }
        }
        if (s.kind === "crossette" && !s.core && s.crackAt > 0 && s.age >= s.crackAt) crackCrossette(s);
      }

      const expired = s.age >= s.life;
      for (let k = s.glyphs.length - 1; k >= 0; k--) {
        const glyph = s.glyphs[k];
        if (expired || s.age >= glyph.dieAt) {
          if (dropAt(s.glyphs, k)) k += 1;
          continue;
        }
        const ch = s.kind === "pompom" ? pompomChar(s.age, glyph.twinkle, s.zDir, glyph.ch) : glyph.ch;
        stampChar(glyph.x, glyph.y, ch, glyph.rgb, 1 - s.zDir);
      }
      const faded =
        s.kind === "original" || s.kind === "pompom" ? s.falling && s.glyphs.length === 0 : s.fadeArmed && s.glyphs.length === 0;
      if (expired || faded) {
        if (dropAt(sparks, i)) i += 1;
      }
    }

    if (sparks.length > 4200) sparks.splice(0, sparks.length - 4200);
  }

  function newAtlasPage() {
    const page = document.createElement("canvas");
    page.width = ATLAS;
    page.height = ATLAS;
    atlasPages.push(page);
    const pageCtx = page.getContext("2d", { alpha: true });
    if (pageCtx) atlasCtxs.push(pageCtx);
    atlasIndex = atlasPages.length - 1;
    atlasX = 0;
    atlasY = 0;
    atlasRowH = 0;
  }

  function resetAtlas() {
    atlasPages = [];
    atlasCtxs = [];
    atlasIndex = -1;
    atlasX = 0;
    atlasY = 0;
    atlasRowH = 0;
    glyphCache.clear();
    newAtlasPage();
  }

  function makeSprite(ch: string, fill: string): Sprite {
    const pad = 2;
    const width = Math.max(cellW, ctx.measureText(ch).width);
    const cssWidth = width + pad * 2;
    const cssHeight = cellH + pad * 2;
    const pw = Math.max(1, Math.ceil(cssWidth * viewScale));
    const ph = Math.max(1, Math.ceil(cssHeight * viewScale));
    if (!scratch || scratch.width < pw || scratch.height < ph) {
      scratch = document.createElement("canvas");
      scratch.width = Math.max(pw, 128);
      scratch.height = Math.max(ph, 128);
      scratchCtx = scratch.getContext("2d", { alpha: true });
    }
    const sctx = scratchCtx!;
    sctx.setTransform(1, 0, 0, 1, 0, 0);
    sctx.clearRect(0, 0, pw, ph);
    sctx.setTransform(viewScale, 0, 0, viewScale, 0, 0);
    sctx.font = fontCss;
    sctx.textBaseline = "top";
    sctx.textAlign = "left";
    sctx.fillStyle = fill;
    sctx.fillText(ch, pad, pad);

    if (atlasIndex < 0) newAtlasPage();
    if (atlasX + pw > ATLAS) {
      atlasX = 0;
      atlasY += atlasRowH;
      atlasRowH = 0;
    }
    if (atlasY + ph > ATLAS) newAtlasPage();
    const actx = atlasCtxs[atlasIndex];
    actx.setTransform(1, 0, 0, 1, 0, 0);
    actx.drawImage(scratch!, 0, 0, pw, ph, atlasX, atlasY, pw, ph);
    const entry: Sprite = {
      atlas: atlasPages[atlasIndex],
      sx: atlasX,
      sy: atlasY,
      sw: pw,
      sh: ph,
      ox: pad,
      oy: pad,
      cssW: cssWidth,
      cssH: cssHeight,
      gen: cacheGen,
    };
    atlasX += pw;
    if (ph > atlasRowH) atlasRowH = ph;
    return entry;
  }

  function paintGlyph(target: CanvasRenderingContext2D, ch: string, key: number, x: number, y: number) {
    let bucket = glyphCache.get(key);
    if (!bucket) {
      bucket = new Map();
      glyphCache.set(key, bucket);
    }
    let entry = bucket.get(ch);
    if (entry) entry.gen = cacheGen;
    else {
      const fill = `rgb(${(key >> 16) & 255},${(key >> 8) & 255},${key & 255})`;
      entry = makeSprite(ch, fill);
      bucket.set(ch, entry);
    }
    target.drawImage(entry.atlas, entry.sx, entry.sy, entry.sw, entry.sh, x - entry.ox, y - entry.oy, entry.cssW, entry.cssH);
  }

  function pruneGlyphCache() {
    cacheGen += 1;
    if (atlasPages.length > 3 && sparks.length === 0 && rockets.length === 0) {
      resetAtlas();
      return;
    }
    if ((cacheGen & 63) !== 0) return;
    for (const [key, bucket] of glyphCache) {
      for (const [ch, entry] of bucket) {
        if (cacheGen - entry.gen > 64) bucket.delete(ch);
      }
      if (bucket.size === 0) glyphCache.delete(key);
    }
  }

  function paintLit() {
    if (useFillTextPaint(litCount, cssW < 800)) {
      paintCells(ctx, lit, litCount, cols, cellW, cellH, glyphs, colors, fontCss);
    } else {
      for (let n = 0; n < litCount; n++) {
        const i = lit[n];
        const ch = glyphs[i];
        if (!ch) continue;
        paintGlyph(ctx, ch, colors[i], (i % cols) * cellW, ((i / cols) | 0) * cellH);
      }
    }
    pruneGlyphCache();
  }

  function frame(now: number) {
    if (paused) {
      running = false;
      last = 0;
      return;
    }
    let dt = last ? (now - last) / 1000 : 0.016;
    last = now;
    if (dt > 0.05) dt = 0.05;
    const pad = Math.max(8, cellW);
    clearLitCells(ctx, lit, litCount, cols, cellW, cellH, pad, cssW, cssH);
    for (let n = 0; n < litCount; n++) energy[lit[n]] = 0;
    litCount = 0;
    step(dt);
    if (rockets.length || sparks.length) {
      paintLit();
      frameId = window.requestAnimationFrame(frame);
      return;
    }
    ctx.clearRect(0, 0, cssW, cssH);
    running = false;
  }

  function ensure() {
    if (running) return;
    running = true;
    last = 0;
    frameId = window.requestAnimationFrame(frame);
  }

  function launch(x: number, y: number) {
    const scheme = pickScheme();
    const size = pickSize();
    const kind = nextKind();
    const room = cssH - y;
    if (room < cellH * 5) {
      explode(x, y, scheme, size, kind);
      ensure();
      return;
    }
    rockets.push({
      x,
      y: cssH - cellH * 0.5,
      tx: x,
      ty: y,
      scheme,
      size,
      kind,
      age: 0,
      dur: Math.max(0.28, Math.min(0.78, room / (cssH * 1.15))),
      phase: "rise",
      hold: 0,
      sway: Math.random() * Math.PI * 2,
      sway2: Math.random() * Math.PI * 2,
      trail: [],
      trailStart: 0,
      tip: null,
    });
    ensure();
  }

  let resizeTimer = 0;

  function scheduleLayout() {
    if (cssW === 0) {
      layout();
      return;
    }
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(layout, 150);
  }

  const observer = new ResizeObserver(scheduleLayout);
  let dprQuery = window.matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`);
  const onDpr = () => {
    dprQuery.removeEventListener("change", onDpr);
    layout();
    dprQuery = window.matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`);
    dprQuery.addEventListener("change", onDpr);
  };
  const onVisibility = () => {
    if (document.hidden) {
      paused = true;
      window.cancelAnimationFrame(frameId);
      running = false;
      last = 0;
      return;
    }
    paused = false;
    if (rockets.length || sparks.length) ensure();
  };

  layout();
  observer.observe(canvas);
  dprQuery.addEventListener("change", onDpr);
  document.addEventListener("visibilitychange", onVisibility);

  return {
    launch,
    sparkCount: () => sparks.length,
    litCells: () => litCount,
    stop() {
      observer.disconnect();
      window.clearTimeout(resizeTimer);
      dprQuery.removeEventListener("change", onDpr);
      document.removeEventListener("visibilitychange", onVisibility);
      window.cancelAnimationFrame(frameId);
      running = false;
    },
  };
}
