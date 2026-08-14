import { readdirSync, existsSync } from "fs";
import path from "path";

const LETTERS_DIR = path.join(process.cwd(), "public", "letters");
const IMAGE_EXT = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg"]);

/** Map of lowercase letter → public URLs for that glyph's variants. */
export type LetterVariantMap = Record<string, string[]>;

/**
 * Scan `public/letters/<char>/*` for image files.
 * Drop files like `public/letters/j/1.png`, `public/letters/j/sketch.webp`.
 * Folder name is the lowercase letter (a–z). Non-letters use text fallback.
 */
export function loadLetterVariants(): LetterVariantMap {
  const map: LetterVariantMap = {};
  if (!existsSync(LETTERS_DIR)) return map;

  for (const entry of readdirSync(LETTERS_DIR, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const key = entry.name.toLowerCase();
    if (!/^[a-z]$/.test(key)) continue;

    const dir = path.join(LETTERS_DIR, entry.name);
    const files = readdirSync(dir)
      .filter((f) => IMAGE_EXT.has(path.extname(f).toLowerCase()))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

    if (files.length) {
      map[key] = files.map((f) => `/letters/${entry.name}/${f}`);
    }
  }

  return map;
}
