# Shared assets

Fonts, images, videos, and files used across multiple designs live here.

```
assets/
  files/     resume PDF, etc.
  fonts/     Aeonik, Tiempos
  images/    pfp frames, clouds, tags, theme icons
  videos/    project clips
```

Design-specific one-offs can live under `src/designs/<id>/assets/` if they should not be shared.

Import from a design file with:

```js
import cloud from '../../../assets/images/cloud (1).png';
```
