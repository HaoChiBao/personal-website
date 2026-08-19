"use client";

import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import {
  extraVariantUrls,
  firstVariantUrls,
  type LetterVariantMap,
} from "@/lib/letter-urls";

type Props = {
  text: string;
  variants: LetterVariantMap;
  /** How long the intro shuffle runs after the first glyphs are ready (ms). */
  durationMs?: number;
  /** Base interval between swaps for a single letter (ms). */
  tickMs?: number;
};

type Slot = {
  char: string;
  key: string;
  /** Every known variant for this character. */
  catalog: string[];
  /** Variants that have loaded (or timed out as unusable). */
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
/** Give up on a single glyph so a hung request cannot stall the name. */
const PRELOAD_TIMEOUT_MS = 6000;
/** Parallel downloads after the first visible wave. */
const PRELOAD_CONCURRENCY = 3;

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

/** First glyph is in the HTML so the browser starts it during parse. */
function buildSlots(text: string, variants: LetterVariantMap): Slot[] {
  return Array.from(text).map((char, i) => {
    const key = char.toLowerCase();
    const catalog =
      char === " " || !variants[key]?.length ? [] : variants[key];
    const first = catalog[0];
    return {
      char,
      key: `${i}-${char}`,
      catalog,
      urls: first ? [first] : [],
      active: first ? 0 : -1,
      rot: i % 2 === 0 ? -18 : 18,
      dur: 0.52,
      width: null,
    };
  });
}

function applyLoaded(
  slots: Slot[],
  loaded: Map<string, number>,
): Slot[] {
  return slots.map((slot) => {
    const extras = slot.catalog.filter(
      (src) => loaded.has(src) && !slot.urls.includes(src),
    );
    if (!extras.length) {
      const current = slot.urls[slot.active];
      return current && loaded.has(current)
        ? { ...slot, width: loaded.get(current) ?? slot.width }
        : slot;
    }
    const urls = [...slot.urls, ...extras];
    const prevSrc = slot.urls[slot.active] ?? urls[0];
    const active = Math.max(0, urls.indexOf(prevSrc));
    const src = urls[active] ?? urls[0];
    return {
      ...slot,
      urls,
      active,
      width: loaded.get(src) ?? slot.width,
    };
  });
}

function remainingUrls(
  text: string,
  variants: LetterVariantMap,
  loaded: Map<string, number>,
): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const char of text) {
    const urls = variants[char.toLowerCase()];
    if (!urls) continue;
    for (const src of urls) {
      if (loaded.has(src) || seen.has(src)) continue;
      seen.add(src);
      out.push(src);
    }
  }
  return out;
}

function preferSlowNetwork(): boolean {
  const conn = (
    navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    }
  ).connection;
  if (!conn) return false;
  return (
    Boolean(conn.saveData) ||
    conn.effectiveType === "slow-2g" ||
    conn.effectiveType === "2g"
  );
}

/** Load, decode, and record display width at the given glyph height. */
function preloadMeasured(
  src: string,
  heightPx: number,
  timeoutMs = PRELOAD_TIMEOUT_MS,
): Promise<{ src: string; width: number; ok: boolean }> {
  return new Promise((resolve) => {
    const img = new Image();
    img.decoding = "async";
    let settled = false;

    const done = (ok: boolean, width: number) => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timer);
      resolve({ src, width, ok });
    };

    const timer = window.setTimeout(
      () => done(false, heightPx),
      timeoutMs,
    );

    const finish = () => {
      const ratio =
        img.naturalHeight > 0 ? img.naturalWidth / img.naturalHeight : 1;
      done(img.naturalWidth > 0, heightPx * ratio);
    };

    img.onload = () => {
      if (typeof img.decode === "function") {
        img.decode().then(finish).catch(finish);
      } else {
        finish();
      }
    };
    img.onerror = () => done(false, heightPx);
    img.src = src;
  });
}

async function preloadPool(
  srcs: string[],
  heightPx: number,
  concurrency: number,
  onEach?: (result: { src: string; width: number; ok: boolean }) => void,
): Promise<{ src: string; width: number; ok: boolean }[]> {
  const results: { src: string; width: number; ok: boolean }[] = [];
  let cursor = 0;

  async function worker() {
    while (cursor < srcs.length) {
      const index = cursor++;
      const result = await preloadMeasured(srcs[index], heightPx);
      results[index] = result;
      onEach?.(result);
    }
  }

  const workers = Array.from(
    { length: Math.min(concurrency, srcs.length) },
    () => worker(),
  );
  await Promise.all(workers);
  return results;
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
 *
 * First visible variant of each letter loads first so the name appears on a
 * slow link. Extra styles stream in afterward and join the shuffle set.
 */
export default function FlickerName({
  text,
  variants,
  durationMs = 2000,
  tickMs = 500,
}: Props) {
  const [slots, setSlots] = useState<Slot[]>(() => buildSlots(text, variants));
  const [fitScale, setFitScale] = useState(1);
  const [shellHeight, setShellHeight] = useState<number | null>(null);
  const reduceMotion = useRef(false);
  const busy = useRef(false);
  const timers = useRef<number[]>([]);
  const widthsRef = useRef<Map<string, number>>(new Map());
  const heightPxRef = useRef(50);
  const restQueued = useRef(false);
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

  function rememberWidth(src: string, img: HTMLImageElement) {
    const heightPx = heightPxRef.current || readFlickHeightPx();
    const ratio =
      img.naturalHeight > 0 ? img.naturalWidth / img.naturalHeight : 1;
    const width = heightPx * ratio;
    if (widthsRef.current.get(src) === width) return;
    widthsRef.current.set(src, width);
    setSlots((prev) =>
      prev.map((slot) => {
        if (!slot.urls.includes(src)) return slot;
        const activeSrc = slot.urls[slot.active];
        return activeSrc === src ? { ...slot, width } : slot;
      }),
    );
  }

  useEffect(() => {
    let alive = true;

    reduceMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    heightPxRef.current = readFlickHeightPx();
    restQueued.current = false;

    if (!reduceMotion.current) {
      busy.current = true;
      const started = performance.now();
      const indices = Array.from(text, (char, i) =>
        char !== " " && (variants[char.toLowerCase()]?.length ?? 0) >= 2
          ? i
          : -1,
      ).filter((i) => i >= 0);

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
    }

    // Extra styles wait until the first glyphs are on screen and the
    // main thread is idle so they do not contend for the first 48KB.
    const prefetchExtras = () => {
      if (!alive || preferSlowNetwork()) return;
      const extras = extraVariantUrls(
        text,
        variants,
        firstVariantUrls(text, variants),
        1,
      );
      if (!extras.length) return;
      void preloadPool(
        extras,
        heightPxRef.current,
        PRELOAD_CONCURRENCY,
        (result) => {
          if (!alive || !result.ok) return;
          widthsRef.current.set(result.src, result.width);
          setSlots((prev) => applyLoaded(prev, widthsRef.current));
        },
      );
    };

    let idleId = 0;
    const idle = window.requestIdleCallback;
    if (typeof idle === "function") {
      idleId = idle(prefetchExtras, { timeout: 2500 });
    } else {
      idleId = window.setTimeout(prefetchExtras, 1200);
    }

    return () => {
      alive = false;
      busy.current = false;
      clearTimers();
      if (typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idleId);
      } else {
        window.clearTimeout(idleId);
      }
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
      const frame = host.closest(".hero") ?? host.parentElement ?? host;
      const available = frame.clientWidth;
      const next =
        naturalW > 0 && available > 0
          ? Math.min(1, (available - 2) / naturalW)
          : 1;
      setFitScale((prev) => (Math.abs(prev - next) < 0.001 ? prev : next));
      setShellHeight(naturalH > 0 ? naturalH * next : null);
    };

    measure();
    const ro = new ResizeObserver(measure);
    const frame = host.closest(".hero") ?? host.parentElement ?? host;
    ro.observe(frame);
    ro.observe(row);
    window.addEventListener("resize", measure);
    window.visualViewport?.addEventListener("resize", measure);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
      window.visualViewport?.removeEventListener("resize", measure);
    };
  }, [slots]);

  function queueRemainingVariants() {
    if (restQueued.current || preferSlowNetwork()) return;
    restQueued.current = true;
    const rest = remainingUrls(text, variants, widthsRef.current);
    if (!rest.length) return;
    void preloadPool(
      rest,
      heightPxRef.current,
      PRELOAD_CONCURRENCY,
      (result) => {
        if (!result.ok) return;
        widthsRef.current.set(result.src, result.width);
        setSlots((prev) => applyLoaded(prev, widthsRef.current));
      },
    );
  }

  function swapOnce() {
    queueRemainingVariants();
    if (reduceMotion.current || busy.current) return;
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
      className="flicker-name is-ready"
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
                      loading="eager"
                      fetchPriority={i === 0 ? "high" : "low"}
                      onLoad={(event) =>
                        rememberWidth(src, event.currentTarget)
                      }
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
