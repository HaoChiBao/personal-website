# Letter designs for the name flicker effect

Drop image variants into a folder named after the **lowercase** letter:

```
public/letters/
  j/
    1.png
    2.png
  a/
    …
```

- Folder name must be a single letter `a`–`z`.
- Any number of files per letter; the site picks randomly while shuffling.
- Supported: `.png`, `.jpg`, `.jpeg`, `.webp`, `.gif`, `.svg`
- If a `.webp` sits next to a same-named raster (e.g. `letter_j (2).png` + `.webp`), the site serves the WebP only.
- Missing letters fall back to plain text for that character.

Needed for “James Yang”: `j`, `a`, `m`, `e`, `s`, `y`, `n`, `g`.

Source sketches can stay as large PNGs. After adding or replacing rasters, run:

```bash
npm run optimize:letters
```

That writes display-sized WebPs (max 192px, enough for a 3× phone screen). The flicker:

1. Preloads one glyph per letter from HTML so phones start the download before JS.
2. Shows those first glyphs, then fetches one extra style per letter for the intro shuffle.
3. Loads the remaining styles only after hover or tap.
4. Times out hung requests. On Save-Data / 2G it stops after the first glyph.
