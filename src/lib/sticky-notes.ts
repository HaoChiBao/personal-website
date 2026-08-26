/**
 * Visitor sticky-note wall. Flip `SHOW_STICKY_NOTES` to `false` to hide
 * Leave a note, the editor, and notes in the background.
 */
export const SHOW_STICKY_NOTES = true;

export const STICKY_COLORS = [
  { id: "yellow", value: "#ffe56a", label: "Yellow" },
  { id: "pink", value: "#ffb4c8", label: "Pink" },
  { id: "blue", value: "#b4d4ff", label: "Blue" },
  { id: "green", value: "#c8e89a", label: "Green" },
  { id: "orange", value: "#ffc48a", label: "Orange" },
] as const;

export const STICKY_FONTS = [
  {
    id: "sans",
    label: "Sans",
    family: "var(--font-plex), var(--font)",
  },
  {
    id: "serif",
    label: "Serif",
    family: "var(--font-plex-serif), Georgia, serif",
  },
  {
    id: "mono",
    label: "Mono",
    family: "var(--font-plex-mono), ui-monospace, monospace",
  },
] as const;

export type StickyColorId = (typeof STICKY_COLORS)[number]["id"];
export type StickyFontId = (typeof STICKY_FONTS)[number]["id"];

export type StickyNoteData = {
  id: string;
  text: string;
  color: StickyColorId;
  font: StickyFontId;
  x: number;
  y: number;
  z: number;
};

export const DEFAULT_STICKY_NOTE: StickyNoteData = {
  id: "make-it-real",
  text: "make it real",
  color: "yellow",
  font: "sans",
  x: 0.04,
  y: 0.18,
  z: 1,
};

export const SEED_STICKY_NOTES: StickyNoteData[] = [
  {
    id: "goal-chess",
    text: "2000 Elo. Start: 1000.\n1500 = tactics, stop hanging pieces.\n2000 = calculation + endgames.\nDaily puzzles. Slow games. Review every loss.",
    color: "yellow",
    font: "sans",
    x: 0.03,
    y: 0.14,
    z: 2,
  },
  {
    id: "goal-ironman",
    text: "Finish an Ironman.\n2.4 mi swim · 112 bike · 26.2 run\nLadder: 5k → Olympic → 70.3 → 140.6\nZone 2. Bricks. One long day a week.",
    color: "orange",
    font: "sans",
    x: 0.74,
    y: 0.62,
    z: 3,
  },
];

export const STICKY_TEXT_MAX = 220;
export const STICKY_WALL_MAX = 80;

export function isStickyColor(value: string): value is StickyColorId {
  return STICKY_COLORS.some((color) => color.id === value);
}

export function isStickyFont(value: string): value is StickyFontId {
  return STICKY_FONTS.some((font) => font.id === value);
}

export function randomStickyPlacement() {
  return {
    x: 0.02 + Math.random() * 0.78,
    y: 0.06 + Math.random() * 0.72,
  };
}

export function sanitizeStickyText(value: string) {
  return value
    .replace(/\r/g, "")
    .replace(/[^\S\n]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
    .slice(0, STICKY_TEXT_MAX);
}

export function stickyColor(id: StickyColorId) {
  return STICKY_COLORS.find((color) => color.id === id)?.value ?? "#ffe56a";
}

export function stickyFont(id: StickyFontId) {
  return (
    STICKY_FONTS.find((font) => font.id === id)?.family ??
    "var(--font-plex), var(--font)"
  );
}
