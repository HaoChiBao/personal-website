import { NextRequest } from "next/server";
import {
  isStickyColor,
  isStickyFont,
  randomStickyPlacement,
  sanitizeStickyText,
} from "@/lib/sticky-notes";
import { addStickyNote, listStickyNotes } from "@/lib/sticky-store";

export const dynamic = "force-dynamic";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 3;
const hits = new Map<string, number[]>();

function clientKey(request: NextRequest) {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || "local";
}

function rateLimited(key: string) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((time) => now - time < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(key, recent);
    return true;
  }
  recent.push(now);
  hits.set(key, recent);
  return false;
}

export async function GET() {
  try {
    const notes = await listStickyNotes();
    return Response.json({ notes });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Could not load sticky notes.";
    return Response.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (rateLimited(clientKey(request))) {
    return Response.json(
      { error: "Please wait a bit before leaving another note." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid note." }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return Response.json({ error: "Invalid note." }, { status: 400 });
  }

  const { text: rawText, color, font } = body as Record<string, unknown>;
  const text = typeof rawText === "string" ? sanitizeStickyText(rawText) : "";

  if (!text) {
    return Response.json({ error: "Write something first." }, { status: 400 });
  }
  if (typeof color !== "string" || !isStickyColor(color)) {
    return Response.json({ error: "Pick a colour." }, { status: 400 });
  }
  if (typeof font !== "string" || !isStickyFont(font)) {
    return Response.json({ error: "Pick a font." }, { status: 400 });
  }

  try {
    const place = randomStickyPlacement();
    const note = await addStickyNote({
      id: crypto.randomUUID(),
      text,
      color,
      font,
      x: place.x,
      y: place.y,
    });
    return Response.json({ note }, { status: 201 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Could not save sticky note.";
    return Response.json({ error: message }, { status: 500 });
  }
}
