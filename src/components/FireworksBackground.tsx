"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { startFireworks } from "@/lib/fireworks";
import { autoBurstCount } from "@/lib/fireworks-budget";
import { fireworkQuality } from "@/lib/fireworks-quality";
import { WASH_SETTLE_MS } from "@/lib/firework-wash-timing";

const BLOCK =
  "a, button, input, textarea, select, label, video, canvas, summary, [role='button'], [contenteditable='true'], .loading-screen, .sticky-note, .sticky-notes__dock, .sticky-editor, .eye-btn, .site-footer, .retro-tv, .copy-toast, .flicker-name, .contrib";

const SHELL = new Set(["site", "hero", "section", "entry-list", "case", "case__header", "case__body"]);

function isBackgroundClick(target: EventTarget | null) {
  if (!(target instanceof Element)) return false;
  if (target.closest(BLOCK)) return false;
  const tag = target.tagName;
  if (tag === "BODY" || tag === "HTML" || tag === "MAIN") return true;
  for (const name of SHELL) {
    if (target.classList.contains(name)) return true;
  }
  return false;
}

const BLOBS = [
  { left: "-12%", top: "-18%", w: "48vw", h: "46vh", delay: "0s", dur: "0.48s", dx: "4vw", dy: "6vh" },
  { left: "38%", top: "-8%", w: "62vw", h: "50vh", delay: "0.03s", dur: "0.55s", dx: "-6vw", dy: "4vh" },
  { left: "62%", top: "28%", w: "54vw", h: "58vh", delay: "0.01s", dur: "0.62s", dx: "-3vw", dy: "-5vh" },
  { left: "-6%", top: "36%", w: "44vw", h: "52vh", delay: "0.06s", dur: "0.52s", dx: "8vw", dy: "-2vh" },
  { left: "22%", top: "58%", w: "70vw", h: "48vh", delay: "0.04s", dur: "0.58s", dx: "2vw", dy: "-8vh" },
  { left: "8%", top: "12%", w: "36vw", h: "34vh", delay: "0.08s", dur: "0.48s", dx: "5vw", dy: "7vh" },
  { left: "70%", top: "62%", w: "42vw", h: "46vh", delay: "0.05s", dur: "0.56s", dx: "-7vw", dy: "-4vh" },
  { left: "46%", top: "40%", w: "28vw", h: "32vh", delay: "0.09s", dur: "0.44s", dx: "-2vw", dy: "5vh" },
];

const AUTO_EVERY = 4000;

type BurstPoint = { x: number; y: number };

function spacedBursts(width: number, height: number, previous: BurstPoint[]): [BurstPoint, BurstPoint] {
  const xPad = width * 0.1;
  const yMin = height * 0.14;
  const yMax = height * 0.55;
  const minGap = Math.max(width, height) * 0.28;
  let best: [BurstPoint, BurstPoint] | null = null;
  let bestScore = -1;
  for (let attempt = 0; attempt < 10; attempt++) {
    const pair: [BurstPoint, BurstPoint] = [
      { x: xPad + Math.random() * (width - xPad * 2), y: yMin + Math.random() * (yMax - yMin) },
      { x: xPad + Math.random() * (width - xPad * 2), y: yMin + Math.random() * (yMax - yMin) },
    ];
    const apart = Math.hypot(pair[0].x - pair[1].x, pair[0].y - pair[1].y);
    if (apart < minGap) continue;
    const nearPrevious = previous.some(
      (point) => Math.hypot(point.x - pair[0].x, point.y - pair[0].y) < minGap * 0.65 || Math.hypot(point.x - pair[1].x, point.y - pair[1].y) < minGap * 0.65,
    );
    const score = apart + (nearPrevious ? 0 : minGap);
    if (score > bestScore) {
      best = pair;
      bestScore = score;
    }
    if (!nearPrevious) break;
  }
  if (best) return best;
  return [
    { x: width * (0.16 + Math.random() * 0.16), y: yMin + Math.random() * (yMax - yMin) },
    { x: width * (0.66 + Math.random() * 0.16), y: yMin + Math.random() * (yMax - yMin) },
  ];
}

let bottleCursor = "";

function fireworkCursor() {
  if (bottleCursor) return bottleCursor;
  const canvas = document.createElement("canvas");
  canvas.width = 32;
  canvas.height = 32;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "auto";
  ctx.font = "24px 'Segoe UI Emoji', 'Apple Color Emoji', emoji, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("🍾", 16, 18);
  bottleCursor = `url("${canvas.toDataURL()}") 8 6, auto`;
  return bottleCursor;
}

const WASH_OUT_MS = 760;

function FireworkWash({ leaving, settled }: { leaving: boolean; settled: boolean }) {
  const className = ["firework-wash", leaving ? "firework-wash--out" : "", settled && !leaving ? "firework-wash--settled" : ""]
    .filter(Boolean)
    .join(" ");
  return (
    <div className={className} aria-hidden="true">
      {BLOBS.map((blob) => (
        <span
          key={`${blob.left}-${blob.top}`}
          className="firework-wash__blob"
          style={{
            left: blob.left,
            top: blob.top,
            width: blob.w,
            height: blob.h,
            ["--blob-delay" as string]: blob.delay,
            ["--blob-dur" as string]: blob.dur,
            ["--dx" as string]: blob.dx,
            ["--dy" as string]: blob.dy,
          }}
        />
      ))}
      <span className="firework-wash__veil" />
    </div>
  );
}

export default function FireworksBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const launchRef = useRef<((x: number, y: number) => void) | null>(null);
  const sparkCountRef = useRef<(() => number) | null>(null);
  const litCellsRef = useRef<(() => number) | null>(null);
  const reducedRef = useRef(false);
  const modeRef = useRef(false);
  const autoRef = useRef(0);
  const exitTimer = useRef(0);
  const settleTimer = useRef(0);
  const lastBurst = useRef<BurstPoint[]>([]);
  const [mode, setMode] = useState(false);
  const [wash, setWash] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [settled, setSettled] = useState(false);

  function stopAuto() {
    window.clearInterval(autoRef.current);
    autoRef.current = 0;
  }

  function launchAuto() {
    if (!modeRef.current || reducedRef.current) return;
    const launch = launchRef.current;
    const canvas = canvasRef.current;
    if (!launch || !canvas) return;
    const rect = canvas.getBoundingClientRect();
    if (rect.width < 1 || rect.height < 1) return;
    const quality = fireworkQuality(rect.width, window.devicePixelRatio || 1);
    const bursts = autoBurstCount({
      narrow: rect.width < 800,
      sparks: sparkCountRef.current?.() ?? 0,
      sparkBudget: quality.sparkBudget,
      litCells: litCellsRef.current?.() ?? 0,
    });
    if (bursts === 0) return;
    const pair = spacedBursts(rect.width, rect.height, lastBurst.current);
    const launched = pair.slice(0, bursts);
    lastBurst.current = launched;
    for (const point of launched) launch(point.x, point.y);
  }

  function startAuto() {
    stopAuto();
    lastBurst.current = [];
    if (reducedRef.current) return;
    launchAuto();
    autoRef.current = window.setInterval(launchAuto, AUTO_EVERY);
  }

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedRef.current = motion.matches;
    const onMotion = () => {
      reducedRef.current = motion.matches;
      if (motion.matches) stopAuto();
      else if (modeRef.current) startAuto();
    };
    const fireworks = startFireworks(canvas);
    launchRef.current = fireworks.launch;
    sparkCountRef.current = fireworks.sparkCount;
    litCellsRef.current = fireworks.litCells;
    const onClick = (event: MouseEvent) => {
      if (!modeRef.current || reducedRef.current) return;
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
      if (!isBackgroundClick(event.target)) return;
      fireworks.launch(event.clientX, event.clientY);
    };
    const onVisibility = () => {
      if (document.hidden) stopAuto();
      else if (modeRef.current) startAuto();
    };
    motion.addEventListener("change", onMotion);
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("click", onClick);
    return () => {
      stopAuto();
      window.clearTimeout(exitTimer.current);
      window.clearTimeout(settleTimer.current);
      launchRef.current = null;
      sparkCountRef.current = null;
      litCellsRef.current = null;
      document.removeEventListener("visibilitychange", onVisibility);
      motion.removeEventListener("change", onMotion);
      window.removeEventListener("click", onClick);
      fireworks.stop();
      document.body.classList.remove("is-firework-mode", "is-firework-leaving");
      document.documentElement.style.removeProperty("--firework-cursor");
    };
  }, []);

  function clearWash() {
    setWash(false);
    setLeaving(false);
    setSettled(false);
    document.body.classList.remove("is-firework-mode", "is-firework-leaving");
  }

  function armSettle() {
    window.clearTimeout(settleTimer.current);
    if (reducedRef.current) {
      setSettled(true);
      return;
    }
    setSettled(false);
    settleTimer.current = window.setTimeout(() => setSettled(true), WASH_SETTLE_MS);
  }

  function onHintClick() {
    if (modeRef.current) {
      modeRef.current = false;
      stopAuto();
      lastBurst.current = [];
      setMode(false);
      document.documentElement.style.removeProperty("--firework-cursor");
      window.clearTimeout(exitTimer.current);
      window.clearTimeout(settleTimer.current);
      setSettled(false);
      if (reducedRef.current) {
        clearWash();
        return;
      }
      document.body.classList.remove("is-firework-mode");
      document.body.classList.add("is-firework-leaving");
      setLeaving(true);
      exitTimer.current = window.setTimeout(clearWash, WASH_OUT_MS);
      return;
    }
    window.clearTimeout(exitTimer.current);
    modeRef.current = true;
    document.documentElement.style.setProperty("--firework-cursor", fireworkCursor());
    setLeaving(false);
    setWash(true);
    setMode(true);
    document.body.classList.remove("is-firework-leaving");
    document.body.classList.add("is-firework-mode");
    armSettle();
    startAuto();
  }

  return (
    <>
      {wash ? <FireworkWash leaving={leaving} settled={settled} /> : null}
      <canvas ref={canvasRef} className="fireworks-bg" aria-hidden="true" />
      <button type="button" className="fireworks-hint" onClick={onHintClick}>
        {mode ? "no more fireworks" : "fireworks?"}
      </button>
    </>
  );
}
