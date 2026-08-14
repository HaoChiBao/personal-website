"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { LetterVariantMap } from "@/lib/letter-assets";

type Props = {
  text: string;
  variants: LetterVariantMap;
  /** How long the rapid shuffle runs after assets are ready (ms). */
  durationMs?: number;
  /** Interval between random picks while shuffling (ms). */
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
};

/** Keep in sync with CSS transition on `.flicker-name__glyph`. */
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

function shuffleOnce(slots: Slot[]): Slot[] {
  return slots.map((slot) => {
    if (slot.urls.length < 2) return slot;
    return {
      ...slot,
      active: pickIndex(slot.urls.length, slot.active),
      rot: pickRot(slot.rot),
    };
  });
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
    };
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

/** Load + decode so swaps hit an already-decoded bitmap. */
function preloadDecoded(src: string): Promise<void> {
  return new Promise((resolve) => {
    const img = new Image();
    img.decoding = "async";
    const done = () => resolve();
    img.onload = () => {
      if (typeof img.decode === "function") {
        img.decode().then(done).catch(done);
      } else {
        done();
      }
    };
    img.onerror = done;
    img.src = src;
  });
}

/**
 * Name as stacked per-letter images. Intro runs a multi-tick shuffle; hover/click
 * swaps each letter once with a scale/rotate transition.
 */
export default function FlickerName({
  text,
  variants,
  durationMs = 2000,
  tickMs = 500,
}: Props) {
  const [slots, setSlots] = useState<Slot[]>(() => buildSlots(text, variants));
  const [ready, setReady] = useState(false);
  const reduceMotion = useRef(false);
  const busy = useRef(false);
  const unlockTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    let alive = true;
    let intervalId: number | undefined;

    reduceMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const needed = urlsNeeded(text, variants);

    (async () => {
      if (needed.length) {
        await Promise.all(needed.map(preloadDecoded));
      }
      if (!alive) return;

      setReady(true);
      setSlots(buildSlots(text, variants));

      if (reduceMotion.current) return;

      busy.current = true;
      const started = performance.now();
      intervalId = window.setInterval(() => {
        if (!alive) return;
        setSlots((prev) => shuffleOnce(prev));
        if (performance.now() - started >= durationMs) {
          if (intervalId !== undefined) window.clearInterval(intervalId);
          intervalId = undefined;
          busy.current = false;
        }
      }, tickMs);
    })();

    return () => {
      alive = false;
      busy.current = false;
      if (intervalId !== undefined) window.clearInterval(intervalId);
      if (unlockTimer.current !== undefined) {
        window.clearTimeout(unlockTimer.current);
      }
    };
  }, [text, variants, durationMs, tickMs]);

  function swapOnce() {
    if (!ready || reduceMotion.current || busy.current) return;
    busy.current = true;
    setSlots((prev) => shuffleOnce(prev));
    if (unlockTimer.current !== undefined) {
      window.clearTimeout(unlockTimer.current);
    }
    unlockTimer.current = window.setTimeout(() => {
      busy.current = false;
      unlockTimer.current = undefined;
    }, SWAP_MS);
  }

  return (
    <h1
      className={`flicker-name${ready ? " is-ready" : ""}`}
      aria-label={text}
    >
      <button
        type="button"
        className="flicker-name__hit"
        onClick={swapOnce}
        onMouseEnter={swapOnce}
        aria-label={`${text} (hover or click to swap letter styles)`}
      >
        <span className="flicker-name__row" aria-hidden="true">
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
                  } as CSSProperties
                }
              >
                <img
                  className="flicker-name__sizer"
                  src={slot.urls[slot.active]}
                  alt=""
                  aria-hidden
                  draggable={false}
                />
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
    </h1>
  );
}
