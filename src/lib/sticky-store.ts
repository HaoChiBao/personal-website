import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { list, put } from "@vercel/blob";
import {
  DEFAULT_STICKY_NOTE,
  STICKY_WALL_MAX,
  type StickyNoteData,
} from "@/lib/sticky-notes";

const BLOB_PATH = "sticky-notes/wall.json";
const LOCAL_PATH = path.join(process.cwd(), "data", "sticky-notes.json");

function useBlob() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

async function readLocal(): Promise<StickyNoteData[]> {
  try {
    const raw = await readFile(LOCAL_PATH, "utf8");
    const parsed = JSON.parse(raw) as StickyNoteData[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeLocal(notes: StickyNoteData[]) {
  await mkdir(path.dirname(LOCAL_PATH), { recursive: true });
  await writeFile(LOCAL_PATH, JSON.stringify(notes, null, 2), "utf8");
}

async function readBlob(): Promise<StickyNoteData[]> {
  const { blobs } = await list({ prefix: BLOB_PATH, limit: 10 });
  const wall = blobs.find((blob) => blob.pathname === BLOB_PATH);
  if (!wall) return [];
  const response = await fetch(wall.url, { cache: "no-store" });
  if (!response.ok) return [];
  const parsed = (await response.json()) as StickyNoteData[];
  return Array.isArray(parsed) ? parsed : [];
}

async function writeBlob(notes: StickyNoteData[]) {
  await put(BLOB_PATH, JSON.stringify(notes), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
    cacheControlMaxAge: 0,
  });
}

async function readWall(): Promise<StickyNoteData[]> {
  if (useBlob()) return readBlob();
  if (process.env.VERCEL) return [];
  return readLocal();
}

async function writeWall(notes: StickyNoteData[]) {
  if (useBlob()) {
    await writeBlob(notes);
    return;
  }
  if (process.env.VERCEL) {
    throw new Error("Sticky notes need BLOB_READ_WRITE_TOKEN on Vercel.");
  }
  await writeLocal(notes);
}

export async function listStickyNotes() {
  const notes = await readWall();
  if (notes.length === 0) return [DEFAULT_STICKY_NOTE];
  return notes;
}

export async function addStickyNote(
  note: Omit<StickyNoteData, "z"> & { z?: number },
) {
  const current = await listStickyNotes();
  const next: StickyNoteData[] = [
    ...current,
    { ...note, z: current.length + 1 },
  ].slice(-STICKY_WALL_MAX);
  await writeWall(next);
  return next[next.length - 1];
}
