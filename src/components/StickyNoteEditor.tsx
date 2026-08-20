"use client";

import { useEffect, useRef } from "react";
import {
  STICKY_COLORS,
  STICKY_FONTS,
  STICKY_TEXT_MAX,
  stickyColor,
  stickyFont,
  type StickyColorId,
  type StickyFontId,
} from "@/lib/sticky-notes";

type Props = {
  title: string;
  action: string;
  text: string;
  color: StickyColorId;
  font: StickyFontId;
  error?: string | null;
  busy?: boolean;
  onText: (text: string) => void;
  onColor: (color: StickyColorId) => void;
  onFont: (font: StickyFontId) => void;
  onSubmit: () => void;
  onClose: () => void;
};

export default function StickyNoteEditor({
  title,
  action,
  text,
  color,
  font,
  onText,
  onColor,
  onFont,
  onSubmit,
  onClose,
  error = null,
  busy = false,
}: Props) {
  const fieldRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    fieldRef.current?.focus();
    document.body.classList.add("is-sticky-editor");
    return () => document.body.classList.remove("is-sticky-editor");
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
        event.preventDefault();
        if (!busy && text.trim()) onSubmit();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [busy, onClose, onSubmit, text]);

  return (
    <div className="sticky-editor" role="presentation" onClick={onClose}>
      <div
        className="sticky-editor__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="sticky-editor-title"
        onClick={(event) => event.stopPropagation()}
      >
        <p className="sticky-editor__title" id="sticky-editor-title">
          {title}
        </p>
        <div
          className="sticky-editor__sheet"
          style={{
            background: stickyColor(color),
            fontFamily: stickyFont(font),
          }}
        >
          <textarea
            ref={fieldRef}
            className="sticky-editor__field"
            value={text}
            rows={6}
            placeholder="Write…"
            maxLength={STICKY_TEXT_MAX}
            spellCheck={false}
            aria-label="Sticky note text"
            onChange={(event) => onText(event.target.value)}
          />
        </div>
        <div className="sticky-editor__tools">
          <div className="sticky-editor__group">
            <p className="sticky-editor__label">Colour</p>
            <div className="sticky-editor__swatches">
              {STICKY_COLORS.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  className={`sticky-editor__swatch${color === option.id ? " is-selected" : ""}`}
                  style={{ background: option.value }}
                  aria-label={option.label}
                  aria-pressed={color === option.id}
                  onClick={() => onColor(option.id)}
                />
              ))}
            </div>
          </div>
          <div className="sticky-editor__group">
            <p className="sticky-editor__label">Font</p>
            <div className="sticky-editor__fonts">
              {STICKY_FONTS.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  className={`sticky-editor__font${font === option.id ? " is-selected" : ""}`}
                  style={{ fontFamily: option.family }}
                  aria-pressed={font === option.id}
                  onClick={() => onFont(option.id)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="sticky-editor__actions">
          {error ? <p className="sticky-editor__error">{error}</p> : null}
          <button type="button" className="sticky-editor__ghost" onClick={onClose}>
            Cancel
          </button>
          <button
            type="button"
            className="sticky-editor__submit"
            disabled={busy || !text.trim()}
            onClick={onSubmit}
          >
            {action}
          </button>
        </div>
      </div>
    </div>
  );
}
