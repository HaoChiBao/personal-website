"use client";

import { useEffect, useState } from "react";
import StickyNote from "@/components/StickyNote";
import StickyNoteEditor from "@/components/StickyNoteEditor";
import {
  type StickyColorId,
  type StickyFontId,
  type StickyNoteData,
} from "@/lib/sticky-notes";

export default function StickyNotes() {
  const [notes, setNotes] = useState<StickyNoteData[]>([]);
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [color, setColor] = useState<StickyColorId>("yellow");
  const [font, setFont] = useState<StickyFontId>("sans");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;
    void fetch("/api/sticky-notes", { cache: "no-store" })
      .then(async (response) => {
        const payload = (await response.json()) as {
          notes?: StickyNoteData[];
        };
        if (!ignore && Array.isArray(payload.notes)) {
          setNotes(payload.notes);
        }
      })
      .catch(() => {
        if (!ignore) setNotes([]);
      });
    return () => {
      ignore = true;
    };
  }, []);

  function bringToFront(id: string) {
    setNotes((current) => {
      const top = Math.max(...current.map((note) => note.z), 1) + 1;
      return current.map((note) =>
        note.id === id ? { ...note, z: top } : note,
      );
    });
  }

  function openCreate() {
    setText("");
    setColor("yellow");
    setFont("sans");
    setError(null);
    setOpen(true);
  }

  async function submitEditor() {
    if (busy) return;
    setBusy(true);
    setError(null);
    try {
      const response = await fetch("/api/sticky-notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, color, font }),
      });
      const payload = (await response.json()) as {
        note?: StickyNoteData;
        error?: string;
      };
      if (!response.ok || !payload.note) {
        setError(payload.error ?? "Could not save that note.");
        return;
      }
      setNotes((current) => [...current, payload.note!]);
      setOpen(false);
    } catch {
      setError("Could not save that note.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="sticky-notes">
      <div className="sticky-notes__dock">
        <button
          type="button"
          className="sticky-notes__add"
          aria-expanded={open}
          onClick={openCreate}
        >
          Leave a note
        </button>
      </div>
      <div className="sticky-notes__layer">
        {notes.map((note) => (
          <StickyNote
            key={note.id}
            note={note}
            onFront={bringToFront}
            onMove={(id, x, y) =>
              setNotes((current) =>
                current.map((item) =>
                  item.id === id ? { ...item, x, y } : item,
                ),
              )
            }
          />
        ))}
      </div>
      {open ? (
        <StickyNoteEditor
          title="Leave a sticky note"
          action={busy ? "Saving…" : "Add note"}
          text={text}
          color={color}
          font={font}
          error={error}
          busy={busy}
          onText={setText}
          onColor={setColor}
          onFont={setFont}
          onSubmit={() => {
            void submitEditor();
          }}
          onClose={() => {
            if (!busy) setOpen(false);
          }}
        />
      ) : null}
    </div>
  );
}
