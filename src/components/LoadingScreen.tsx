"use client";

import { useEffect, useRef, useState } from "react";

/** Hold the last frame before the overlay dissolves. */
const HOLD_LAST_MS = 400;
/** CSS dissolve length (keep in sync with globals.css). */
const DISSOLVE_MS = 400;
/** If playback never starts (autoplay block, decode fail), skip. */
const PLAY_WATCHDOG_MS = 2000;
/** Hard cap so a stalled decoder cannot pin the overlay forever. */
const MAX_WAIT_MS = 8000;

type Phase = "playing" | "holding" | "dissolving" | "done";

function pickLoaderSrc(): string {
  // Always MP4: VP9 alpha WebM is often composited onto a black video
  // plane, which is the intermittent black flash. This file is the
  // original doodle flattened onto white.
  return "/loading.mp4?v=4";
}

function isAbort(err: unknown): boolean {
  return (
    typeof err === "object" &&
    err !== null &&
    "name" in err &&
    (err as { name: string }).name === "AbortError"
  );
}

/**
 * Full-viewport loader: one muted clip plays once, then the overlay dissolves.
 * A poster sits underneath until the first painted frame so the video element's
 * default black compositor never shows through.
 */
export default function LoadingScreen() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const bloomCanvasRef = useRef<HTMLCanvasElement>(null);
  const finishedRef = useRef(false);
  const [phase, setPhase] = useState<Phase>("playing");
  const [src, setSrc] = useState<string | null>(null);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const conn = (
      navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string };
      }
    ).connection;
    const saveData = Boolean(
      conn?.saveData ||
        conn?.effectiveType === "slow-2g" ||
        conn?.effectiveType === "2g",
    );

    if (reduceMotion || saveData || finishedRef.current) {
      setPhase("holding");
      const t = window.setTimeout(() => setPhase("dissolving"), 200);
      const t2 = window.setTimeout(() => setPhase("done"), 200 + DISSOLVE_MS);
      return () => {
        window.clearTimeout(t);
        window.clearTimeout(t2);
      };
    }

    setSrc(pickLoaderSrc());
  }, []);

  useEffect(() => {
    if (!src || finishedRef.current) return;

    const video = videoRef.current;
    if (!video) return;

    let holdTimer: number | undefined;
    let doneTimer: number | undefined;
    let playWatchdog: number | undefined;
    let maxWait: number | undefined;
    let raf = 0;
    let removed = false;

    const drawBloom = () => {
      const canvas = bloomCanvasRef.current;
      if (!canvas || removed) return;

      const w = video.videoWidth;
      const h = video.videoHeight;
      if (w && h) {
        if (canvas.width !== w) canvas.width = w;
        if (canvas.height !== h) canvas.height = h;
        const ctx = canvas.getContext("2d", { alpha: false });
        if (ctx) {
          ctx.fillStyle = "#fff";
          ctx.fillRect(0, 0, w, h);
          ctx.drawImage(video, 0, 0, w, h);
        }
      }

      if (!finishedRef.current) {
        raf = window.requestAnimationFrame(drawBloom);
      }
    };

    const finish = () => {
      if (finishedRef.current || removed) return;
      finishedRef.current = true;

      try {
        video.pause();
      } catch {
        /* ignore */
      }
      drawBloom();

      setPhase("holding");
      holdTimer = window.setTimeout(() => {
        setPhase("dissolving");
        doneTimer = window.setTimeout(() => setPhase("done"), DISSOLVE_MS);
      }, HOLD_LAST_MS);
    };

    const onPlaying = () => {
      window.clearTimeout(playWatchdog);
      setShowVideo(true);
      window.cancelAnimationFrame(raf);
      raf = window.requestAnimationFrame(drawBloom);
    };

    const onEnded = () => finish();

    const onError = () => finish();

    const tryPlay = async () => {
      video.muted = true;
      video.defaultMuted = true;
      video.playsInline = true;
      video.loop = false;
      try {
        await video.play();
      } catch (err) {
        if (removed || isAbort(err)) return;
        finish();
      }
    };

    video.addEventListener("playing", onPlaying);
    video.addEventListener("ended", onEnded);
    video.addEventListener("error", onError);

    const onCanPlay = () => {
      void tryPlay();
    };

    if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
      void tryPlay();
    } else {
      video.addEventListener("canplay", onCanPlay, { once: true });
    }

    playWatchdog = window.setTimeout(() => {
      if (!finishedRef.current && video.paused) finish();
    }, PLAY_WATCHDOG_MS);

    maxWait = window.setTimeout(() => finish(), MAX_WAIT_MS);

    return () => {
      removed = true;
      video.removeEventListener("playing", onPlaying);
      video.removeEventListener("ended", onEnded);
      video.removeEventListener("error", onError);
      video.removeEventListener("canplay", onCanPlay);
      video.pause();
      window.cancelAnimationFrame(raf);
      window.clearTimeout(holdTimer);
      window.clearTimeout(doneTimer);
      window.clearTimeout(playWatchdog);
      window.clearTimeout(maxWait);
    };
  }, [src]);

  const skip = () => {
    if (phase === "dissolving" || phase === "done") return;
    finishedRef.current = true;

    const video = videoRef.current;
    if (video) {
      try {
        video.pause();
      } catch {
        /* ignore */
      }
    }

    setPhase("dissolving");
    window.setTimeout(() => setPhase("done"), DISSOLVE_MS);
  };

  if (phase === "done") return null;

  return (
    <div
      className="loading-screen"
      data-phase={phase}
      aria-busy={phase !== "dissolving"}
      aria-live="polite"
    >
      <div className="loading-screen__frame">
        <div className="loading-screen__bloom" aria-hidden>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="loading-screen__media loading-screen__media--poster"
            src="/loading-poster.png?v=4"
            alt=""
            width={560}
            height={316}
            draggable={false}
          />
          <canvas
            ref={bloomCanvasRef}
            className="loading-screen__media loading-screen__media--video"
            data-ready={showVideo ? "true" : "false"}
            width={560}
            height={316}
          />
        </div>
        <div className="loading-screen__clip">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="loading-screen__media loading-screen__media--poster"
            src="/loading-poster.png?v=4"
            alt=""
            width={560}
            height={316}
            draggable={false}
          />
          {src ? (
            <video
              ref={videoRef}
              className="loading-screen__media loading-screen__media--video"
              data-ready={showVideo ? "true" : "false"}
              width={560}
              height={316}
              muted
              playsInline
              preload="auto"
              autoPlay
              loop={false}
              controls={false}
              disablePictureInPicture
              src={src}
              // iOS < 13 ignores playsInline unless the webkit attribute is set.
              {...{ "webkit-playsinline": "true" }}
            />
          ) : null}
        </div>
      </div>
      {phase === "playing" || phase === "holding" ? (
        <button
          type="button"
          className="loading-screen__skip"
          onClick={skip}
        >
          skip
        </button>
      ) : null}
    </div>
  );
}
