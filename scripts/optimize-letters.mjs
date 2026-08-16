#!/usr/bin/env node
/**
 * Generate display-sized WebP variants next to each letter PNG.
 * Flicker glyphs render at 3.6em ≈ 55 CSS px. 192px covers a 3x
 * display (167px) with a little slack for the hover scale.
 *
 * Usage: node scripts/optimize-letters.mjs
 */
import { readdirSync, existsSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const LETTERS_DIR = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "public",
  "letters",
);
const MAX_PX = 192;
const WEBP_QUALITY = 70;
const SOURCE_EXT = new Set([".png", ".jpg", ".jpeg"]);

async function optimizeFile(srcPath) {
  const parsed = path.parse(srcPath);
  const destPath = path.join(parsed.dir, `${parsed.name}.webp`);
  await sharp(srcPath)
    .rotate()
    .resize(MAX_PX, MAX_PX, { fit: "inside", withoutEnlargement: true })
    .webp({ quality: WEBP_QUALITY, alphaQuality: 85, effort: 6 })
    .toFile(destPath);
  return destPath;
}

async function main() {
  if (!existsSync(LETTERS_DIR)) {
    console.error("missing", LETTERS_DIR);
    process.exit(1);
  }

  let before = 0;
  let after = 0;
  let count = 0;

  for (const entry of readdirSync(LETTERS_DIR, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const dir = path.join(LETTERS_DIR, entry.name);
    const files = readdirSync(dir).filter((f) =>
      SOURCE_EXT.has(path.extname(f).toLowerCase()),
    );

    for (const file of files) {
      const srcPath = path.join(dir, file);
      const destPath = await optimizeFile(srcPath);
      const srcBytes = statSync(srcPath).size;
      const destBytes = statSync(destPath).size;
      before += srcBytes;
      after += destBytes;
      count += 1;
      const rel = path.relative(LETTERS_DIR, destPath);
      console.log(
        `${rel}: ${(srcBytes / 1024).toFixed(0)}KB → ${(destBytes / 1024).toFixed(0)}KB`,
      );
    }
  }

  console.log(
    `\n${count} files: ${(before / 1024 / 1024).toFixed(1)}MB → ${(after / 1024 / 1024).toFixed(1)}MB`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
