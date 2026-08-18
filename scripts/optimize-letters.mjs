#!/usr/bin/env node
/**
 * Tight-crop each letter raster to its ink, pad back to a square, then
 * write a display-sized WebP. Flicker glyphs render at 3.6em ≈ 55 CSS px.
 * 192px covers a 3x display (167px) with a little slack for the hover scale.
 *
 * Usage: node scripts/optimize-letters.mjs
 */
import { readdirSync, existsSync, renameSync, statSync, unlinkSync } from "node:fs";
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
const TRIM_THRESHOLD = 10;
const SOURCE_EXT = new Set([".png", ".jpg", ".jpeg"]);

async function cropToContentSquare(srcPath) {
  const original = sharp(srcPath, { failOn: "none" }).rotate().ensureAlpha();
  const meta = await original.metadata();
  const origW = meta.width ?? 0;
  const origH = meta.height ?? 0;

  let trimmed;
  try {
    trimmed = await original
      .clone()
      .trim({ threshold: TRIM_THRESHOLD })
      .toBuffer({ resolveWithObject: true });
  } catch {
    return { changed: false, width: origW, height: origH };
  }

  const { data, info } = trimmed;
  const alreadyTightSquare =
    info.width === origW && info.height === origH && origW === origH;
  if (alreadyTightSquare) {
    return { changed: false, width: origW, height: origH };
  }

  const side = Math.max(info.width, info.height);
  const extraX = side - info.width;
  const extraY = side - info.height;
  const tmpPath = `${srcPath}.crop-tmp.png`;

  try {
    await sharp(data)
      .ensureAlpha()
      .extend({
        top: Math.floor(extraY / 2),
        bottom: Math.ceil(extraY / 2),
        left: Math.floor(extraX / 2),
        right: Math.ceil(extraX / 2),
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .png({ compressionLevel: 9 })
      .toFile(tmpPath);
    renameSync(tmpPath, srcPath);
  } catch (err) {
    try {
      unlinkSync(tmpPath);
    } catch {
      /* ignore */
    }
    throw err;
  }

  return {
    changed: true,
    from: `${origW}x${origH}`,
    content: `${info.width}x${info.height}`,
    to: `${side}x${side}`,
  };
}

async function writeWebp(srcPath) {
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
  let cropped = 0;

  for (const entry of readdirSync(LETTERS_DIR, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const dir = path.join(LETTERS_DIR, entry.name);
    const files = readdirSync(dir).filter((f) =>
      SOURCE_EXT.has(path.extname(f).toLowerCase()),
    );

    for (const file of files) {
      const srcPath = path.join(dir, file);
      const crop = await cropToContentSquare(srcPath);
      const destPath = await writeWebp(srcPath);
      const srcBytes = statSync(srcPath).size;
      const destBytes = statSync(destPath).size;
      before += srcBytes;
      after += destBytes;
      count += 1;
      if (crop.changed) cropped += 1;
      const rel = path.relative(LETTERS_DIR, destPath);
      const cropNote = crop.changed
        ? ` crop ${crop.from} → ${crop.content} → ${crop.to}`
        : "";
      console.log(
        `${rel}: ${(srcBytes / 1024).toFixed(0)}KB → ${(destBytes / 1024).toFixed(0)}KB${cropNote}`,
      );
    }
  }

  console.log(
    `\n${count} files (${cropped} cropped): ${(before / 1024 / 1024).toFixed(1)}MB → ${(after / 1024 / 1024).toFixed(1)}MB webp`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
