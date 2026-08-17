"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import { createPortal } from "react-dom";

const TOAST_VISIBLE_MS = 2800;
const TOAST_EXIT_MS = 280;

const copyText = async (text: string) => {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const field = document.createElement("textarea");
  field.value = text;
  field.setAttribute("readonly", "");
  field.style.position = "absolute";
  field.style.left = "-9999px";
  document.body.appendChild(field);
  field.select();
  document.execCommand("copy");
  document.body.removeChild(field);
};

type Props = {
  email: string;
  label?: string;
};

const CopyEmailLink = ({ email, label = "email" }: Props) => {
  const [phase, setPhase] = useState<"hidden" | "in" | "out">("hidden");
  const [toastKey, setToastKey] = useState(0);
  const [canPortal, setCanPortal] = useState(false);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const exitTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setCanPortal(true);

    return () => {
      if (hideTimer.current) clearTimeout(hideTimer.current);
      if (exitTimer.current) clearTimeout(exitTimer.current);
    };
  }, []);

  const showToast = () => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    if (exitTimer.current) clearTimeout(exitTimer.current);

    setToastKey((key) => key + 1);
    setPhase("in");
    hideTimer.current = setTimeout(() => {
      setPhase("out");
      exitTimer.current = setTimeout(() => {
        setPhase("hidden");
      }, TOAST_EXIT_MS);
    }, TOAST_VISIBLE_MS);
  };

  const handleClick = async (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    try {
      await copyText(email);
    } catch {
      // Still show the address if the clipboard write fails.
    }

    showToast();
  };

  const toast =
    canPortal && phase !== "hidden" ? (
      <div className="copy-toast-root" key={toastKey}>
        <div
          className={`copy-toast${phase === "out" ? " copy-toast--out" : ""}`}
          role="status"
          aria-live="polite"
        >
          <svg
            className="copy-toast__check"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M3.5 8.2 6.4 11.2 12.5 4.8"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="copy-toast__text">
            <p className="copy-toast__label">Email copied to clipboard</p>
            <p className="copy-toast__email">{email}</p>
          </div>
        </div>
      </div>
    ) : null;

  return (
    <>
      <a href={`mailto:${email}`} onClick={handleClick}>
        {label}
      </a>
      {toast ? createPortal(toast, document.body) : null}
    </>
  );
};

export default CopyEmailLink;
