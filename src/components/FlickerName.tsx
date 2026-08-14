"use client";

import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import type { LetterVariantMap } from "@/lib/letter-assets";

type Props = {
  text: string;
  variants: LetterVariantMap;
  /** How long the intro shuffle runs after assets are ready (ms). */
  durationMs?: number;
  /** Base interval between swaps for a single letter (ms). */
  tickMs?: number;
};

type Slot = {
  char: string;
  key: string;
  urls: string[];
  /** Index into urls; -1 = plain text fallback */
  active: number;
  /** Exit/enter lean in degrees (sign flips the tilt). */
  rot: number;
  /** Per-letter transition length (seconds). */
  dur: number;
  /** Display width of the active glyph (px); animated via CSS. */
  width: number | null;
};

/** Keep roughly in sync with CSS transition on `.flicker-name__glyph`. */
const SWAP_MS = 520;

function pickIndex(len: number, avoid: number): number {
  if (len <= 1) return 0;
  let next = Math.floor(Math.random() * len);
  let guard = 0;
  while (next === avoid && guard++ < 8) {
    next = Math.floor(Math.random() * len);
  }
  return next;
}

function pickRot(avoid = 0): number {
  const mag = 16 + Math.random() * 10; // 16–26deg
  const next = Math.random() < 0.5 ? -mag : mag;
  return Math.sign(next) === Math.sign(avoid) ? -next : next;
}

function pickDur(): number {
  return 0.4 + Math.random() * 0.28; // 0.40–0.68s
}

function glyphWidth(
  src: string,
  widths: Map<string, number>,
): number | null {
  return widths.get(src) ?? null;
}

function swapSlotAt(
  slots: Slot[],
  index: number,
  widths: Map<string, number>,
): Slot[] {
  return slots.map((slot, i) => {
    if (i !== index || slot.urls.length < 2) return slot;
    const active = pickIndex(slot.urls.length, slot.active);
    const src = slot.urls[active];
    return {
      ...slot,
      active,
      rot: pickRot(slot.rot),
      dur: pickDur(),
      width: glyphWidth(src, widths) ?? slot.width,
    };
  });
}

function letterIndices(slots: Slot[]): number[] {
  const out: number[] = [];
  slots.forEach((slot, i) => {
    if (slot.urls.length >= 2) out.push(i);
  });
  return out;
}

/** Fisher–Yates shuffle. */
function shuffled<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/** Deterministic first frame for SSR / hydration. */
function buildSlots(text: string, variants: LetterVariantMap): Slot[] {
  return Array.from(text).map((char, i) => {
    const key = char.toLowerCase();
    const urls =
      char === " " || !variants[key]?.length ? [] : variants[key];
    return {
      char,
      key: `${i}-${char}`,
      urls,
      active: urls.length ? 0 : -1,
      rot: i % 2 === 0 ? -18 : 18,
      dur: 0.52,
      width: null,
    };
  });
}

function withWidths(slots: Slot[], widths: Map<string, number>): Slot[] {
  return slots.map((slot) => {
    if (!slot.urls.length || slot.active < 0) return slot;
    const src = slot.urls[slot.active];
    return { ...slot, width: widths.get(src) ?? slot.width };
  });
}

function urlsNeeded(text: string, variants: LetterVariantMap): string[] {
  const set = new Set<string>();
  for (const char of text) {
    const urls = variants[char.toLowerCase()];
    if (!urls) continue;
    for (const u of urls) set.add(u);
  }
  return [...set];
}

/** Load, decode, and record display width at the given glyph height. */
function preloadMeasured(
  src: string,
  heightPx: number,
): Promise<{ src: string; width: number }> {
  return new Promise((resolve) => {
    const img = new Image();
    img.decoding = "async";
    const finish = () => {
      const ratio =
        img.naturalHeight > 0 ? img.naturalWidth / img.naturalHeight : 1;
      resolve({ src, width: heightPx * ratio });
    };
    img.onload = () => {
      if (typeof img.decode === "function") {
        img.decode().then(finish).catch(finish);
      } else {
        finish();
      }
    };
    img.onerror = () => resolve({ src, width: heightPx });
    img.src = src;
  });
}

function readFlickHeightPx(): number {
  if (typeof document === "undefined") return 50;
  const probe = document.createElement("div");
  probe.style.cssText =
    "position:absolute;visibility:hidden;height:var(--flick-size);pointer-events:none";
  document.body.appendChild(probe);
  const h = probe.getBoundingClientRect().height || 50;
  probe.remove();
  return h;
}

/**
 * Name as stacked per-letter images. Intro and hover swaps stagger each letter
 * on its own random timeline; slot width eases between glyph sizes.
 */
export default function FlickerName({
  text,
  variants,
  durationMs = 2000,
  tickMs = 500,
}: Props) {
  const [slots, setSlots] = useState<Slot[]>(() => buildSlots(text, variants));
  const [ready, setReady] = useState(false);
  const [fitScale, setFitScale] = useState(1);
  const [shellHeight, setShellHeight] = useState<number | null>(null);
  const reduceMotion = useRef(false);
  const busy = useRef(false);
  const timers = useRef<number[]>([]);
  const widthsRef = useRef<Map<string, number>>(new Map());
  const hostRef = useRef<HTMLHeadingElement>(null);
  const hitRef = useRef<HTMLButtonElement>(null);
  const rowRef = useRef<HTMLSpanElement>(null);

  function clearTimers() {
    for (const id of timers.current) window.clearTimeout(id);
    timers.current = [];
  }

  function later(ms: number, fn: () => void) {
    const id = window.setTimeout(fn, ms);
    timers.current.push(id);
    return id;
  }

  useEffect(() => {
    let alive = true;

    reduceMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const needed = urlsNeeded(text, variants);

    (async () => {
      const heightPx = readFlickHeightPx();
      const measured = needed.length
        ? await Promise.all(needed.map((src) => preloadMeasured(src, heightPx)))
        : [];
      if (!alive) return;

      const widths = new Map(measured.map((m) => [m.src, m.width]));
      widthsRef.current = widths;

      const initial = withWidths(buildSlots(text, variants), widths);
      setReady(true);
      setSlots(initial);

      if (reduceMotion.current) return;

      busy.current = true;
      const started = performance.now();
      const indices = letterIndices(initial);

      for (const idx of indices) {
        const run = () => {
          if (!alive) return;
          setSlots((prev) => swapSlotAt(prev, idx, widthsRef.current));
          if (performance.now() - started < durationMs) {
            const nextIn = tickMs * (0.45 + Math.random() * 1.1);
            later(nextIn, run);
          }
        };
        later(Math.random() * tickMs * 1.2, run);
      }

      later(durationMs + tickMs + SWAP_MS, () => {
        if (alive) busy.current = false;
      });
    })();

    return () => {
      alive = false;
      busy.current = false;
      clearTimers();
    };
  }, [text, variants, durationMs, tickMs]);

  // Scale the name down whenever it would overflow the available width.
  useLayoutEffect(() => {
    const host = hostRef.current;
    const row = rowRef.current;
    if (!host || !row) return;

    const measure = () => {
      // offset/scroll sizes ignore parent transforms — natural layout width.
      const naturalW = row.scrollWidth;
      const naturalH = row.offsetHeight;
      const available = host.clientWidth;
      const next =
        naturalW > 0 && available > 0
          ? Math.min(1, (available - 2) / naturalW)
          : 1;
      setFitScale((prev) => (Math.abs(prev - next) < 0.001 ? prev : next));
      setShellHeight(naturalH > 0 ? naturalH * next : null);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(host);
    ro.observe(row);
    window.addEventListener("resize", measure);
    window.visualViewport?.addEventListener("resize", measure);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
      window.visualViewport?.removeEventListener("resize", measure);
    };
  }, [slots, ready]);

  function swapOnce() {
    if (!ready || reduceMotion.current || busy.current) return;
    busy.current = true;

    const order = shuffled(letterIndices(slots));
    let maxDelay = 0;

    order.forEach((idx, rank) => {
      const delay = rank * (35 + Math.random() * 55) + Math.random() * 160;
      maxDelay = Math.max(maxDelay, delay);
      later(delay, () => {
        setSlots((cur) => swapSlotAt(cur, idx, widthsRef.current));
      });
    });

    later(maxDelay + SWAP_MS + 80, () => {
      busy.current = false;
    });
  }

  return (
    <h1
      ref={hostRef}
      className={`flicker-name${ready ? " is-ready" : ""}`}
      aria-label={text}
    >
      <span
        className="flicker-name__shell"
        style={shellHeight != null ? { height: shellHeight } : undefined}
      >
        <button
          ref={hitRef}
          type="button"
          className="flicker-name__hit"
          style={
            fitScale < 1
              ? ({ transform: `scale(${fitScale})` } as CSSProperties)
              : undefined
          }
          onClick={swapOnce}
          onMouseEnter={swapOnce}
          aria-label={`${text} (hover or click to swap letter styles)`}
        >
          <span ref={rowRef} className="flicker-name__row" aria-hidden="true">
            {slots.map((slot) =>
              slot.char === " " ? (
                <span key={slot.key} className="flicker-name__space">
                  {"\u00a0"}
                </span>
              ) : slot.urls.length ? (
                <span
                  key={slot.key}
                  className="flicker-name__slot"
                  style={
                    {
                      "--flick-rot": `${slot.rot}deg`,
                      "--flick-dur": `${slot.dur}s`,
                      ...(slot.width != null
                        ? { width: `${slot.width}px` }
                        : {}),
                    } as CSSProperties
                  }
                >
                  {slot.urls.map((src, i) => (
                    <img
                      key={src}
                      className={
                        i === slot.active
                          ? "flicker-name__glyph is-on"
                          : "flicker-name__glyph"
                      }
                      src={src}
                      alt=""
                      draggable={false}
                      decoding="async"
                    />
                  ))}
                </span>
              ) : (
                <span key={slot.key} className="flicker-name__fallback">
                  {slot.char}
                </span>
              ),
            )}
          </span>
        </button>
      </span>
    </h1>
  );
}
