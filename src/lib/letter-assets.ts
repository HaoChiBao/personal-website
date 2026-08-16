import { readdirSync, existsSync } from "fs";
import path from "path";
import type { LetterVariantMap } from "./letter-urls";

export type { LetterVariantMap } from "./letter-urls";
export { extraVariantUrls, firstVariantUrls } from "./letter-urls";

const LETTERS_DIR = path.join(process.cwd(), "public", "letters");
const IMAGE_EXT = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg"]);
const RASTER_FALLBACK = new Set([".png", ".jpg", ".jpeg"]);

function stem(filename: string): string {
  const ext = path.extname(filename);
  return ext ? filename.slice(0, -ext.length) : filename;
}

/**
 * Prefer the display-sized `.webp` when it sits next to a source raster.
 * That keeps the flicker from requesting the original 1–3MB PNGs.
 */
export function selectDisplayFiles(files: string[]): string[] {
  const webpStems = new Set(
    files
      .filter((f) => path.extname(f).toLowerCase() === ".webp")
      .map(stem),
  );

  return files.filter((f) => {
    const ext = path.extname(f).toLowerCase();
    if (!IMAGE_EXT.has(ext)) return false;
    if (webpStems.has(stem(f)) && RASTER_FALLBACK.has(ext)) return false;
    return true;
  });
}

/** Encode spaces and other reserved characters in a public letter path. */
export function letterPublicUrl(letter: string, file: string): string {
  return encodeURI(`/letters/${letter}/${file}`);
}

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
    const files = selectDisplayFiles(readdirSync(dir)).sort((a, b) =>
      a.localeCompare(b, undefined, { numeric: true }),
    );

    if (files.length) {
      map[key] = files.map((f) => letterPublicUrl(entry.name, f));
    }
  }

  return map;
}
