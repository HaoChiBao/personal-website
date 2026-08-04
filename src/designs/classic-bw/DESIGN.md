# Classic B&W

## Status
`ready` — default live design.

## Visual identity
High-contrast black and white personal site. Centered profile card, dotted cloud banner, circular profile frames, black stat pills, grayscale project cards. Light/dark theme flips `--main-color` / `--inverse-color`.

## Goals
- Clean, readable, portfolio-first
- Strong silhouette and type hierarchy
- Shared media (pfp frames, project videos, tags) from `src/assets`

## Color
- Light: bg `#ffffff`, ink `#000000`
- Dark: bg `#000000`, ink `#ffffff`
- Accent sparingly (verified badge, loader blue selection)

## Type
- Aeonik — UI / body
- Tiempos Fine — optional display moments

## Structure
```
classic-bw/
  pages/          Home, BlogPage
  components/     Landing, Projects, NavBar, Footer, …
  hooks/          useScramble
  resources/      project + metric content
  DESIGN.md       this file
```

## Shared assets used
- `src/assets/images/pfp/*`
- `src/assets/images/cloud (1|2).png`, `verified.png`, theme icons, tags
- `src/assets/videos/*`
- `src/assets/files/James_Yang-Resume.pdf`
- `src/assets/fonts/*` (loaded via root `src/index.css`)

## Switching
`?design=classic-bw` or Dev switcher → **Classic B&W**
