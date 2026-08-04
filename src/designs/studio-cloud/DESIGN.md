# Studio Cloud

## Status
`ready` — alternate layout experiment.

## Visual identity
Wide header, floating cloud imagery, short intro copy, and a highlights grid driven by `data/entries.js`. Closer to a studio landing than a profile card.

## Goals
- Lighter narrative intro
- Project/highlight browsing as the main scroll story
- Reuse shared clouds + project videos from `src/assets`

## Structure
```
studio-cloud/
  pages/Home_V2.jsx
  components/Highlights, HighlightItem
  data/entries.js
  styles/v2.css
  DESIGN.md
```

## Shared assets used
- `src/assets/images/cloud (1|2).png`
- `src/assets/videos/boardy.mp4`, `nodes.mp4`, `uofthacks.mp4`

## Switching
`?design=studio-cloud` or Dev switcher → **Studio Cloud**
