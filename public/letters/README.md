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

That tight-crops each raster to the letter ink (then pads the shorter axis so the canvas stays square) and writes display-sized WebPs (max 192px, enough for a 3× phone screen). The flicker:

1. Puts the first glyph of each letter in the HTML (`<img>` + high-priority preload) so the browser starts those 8 files during parse, not after JS.
2. Shows each letter as soon as its file arrives. Extra styles wait for idle time, then hover/tap.
3. Times out hung requests. On Save-Data / 2G it stops after the first glyph.
