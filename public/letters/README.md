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
- Missing letters fall back to plain text for that character.

Needed for “James Yang”: `j`, `a`, `m`, `e`, `s`, `y`, `n`, `g`.

The flicker **waits until those images have loaded and decoded** before shuffling, and keeps every variant mounted so swaps are opacity-only (no mid-animation network/decode stalls).
