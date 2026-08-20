"use client";

import { useRef, useState } from "react";
import {
  stickyColor,
  stickyFont,
  type StickyNoteData,
} from "@/lib/sticky-notes";

type Props = {
  note: StickyNoteData;
  onMove: (id: string, x: number, y: number) => void;
  onFront: (id: string) => void;
};

function placed(value: number) {
  return value >= 0 && value <= 1;
}

export default function StickyNote({ note, onMove, onFront }: Props) {
  const noteRef = useRef<HTMLElement>(null);
  const drag = useRef<{
    dx: number;
    dy: number;
    startX: number;
    startY: number;
    moved: boolean;
  } | null>(null);
  const [dragging, setDragging] = useState(false);

  return (
    <aside
      ref={noteRef}
      className={`sticky-note${dragging ? " is-dragging" : ""}`}
      style={{
        left: placed(note.x)
          ? `clamp(0.4rem, ${note.x * 100}vw, calc(100vw - 9.6rem))`
          : note.x,
        top: placed(note.y)
          ? `clamp(0.4rem, ${note.y * 100}vh, calc(100vh - 9.6rem))`
          : note.y,
        zIndex: dragging ? note.z + 20 : note.z,
        background: stickyColor(note.color),
        fontFamily: stickyFont(note.font),
      }}
      aria-label={note.text || "Sticky note"}
      onPointerDown={(event) => {
        const el = noteRef.current;
        if (!el) return;
        const box = el.getBoundingClientRect();
        drag.current = {
          dx: event.clientX - box.left,
          dy: event.clientY - box.top,
          startX: event.clientX,
          startY: event.clientY,
          moved: false,
        };
        onFront(note.id);
      }}
      onPointerMove={(event) => {
        if (!drag.current) return;
        const dist = Math.hypot(
          event.clientX - drag.current.startX,
          event.clientY - drag.current.startY,
        );
        if (!drag.current.moved) {
          if (dist < 6) return;
          drag.current.moved = true;
          setDragging(true);
          noteRef.current?.setPointerCapture(event.pointerId);
        }
        onMove(
          note.id,
          event.clientX - drag.current.dx,
          event.clientY - drag.current.dy,
        );
      }}
      onPointerUp={() => {
        drag.current = null;
        setDragging(false);
      }}
      onPointerCancel={() => {
        drag.current = null;
        setDragging(false);
      }}
    >
      <p className="sticky-note__text">{note.text}</p>
    </aside>
  );
}
