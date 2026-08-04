# Designs

Each visual direction for the site is a **design pack** under this folder.
Shared media (fonts, images, videos, resume) lives in [`src/assets`](../assets).

## Quick switch

| Method | How |
|--------|-----|
| Dev UI | Floating **Design:** control (bottom-right) while `npm start` |
| Testing preview | Same switcher auto-shows on the Vercel `testing` branch URL |
| URL | `http://localhost:3000/?design=classic-bw` |
| Persist | Choice saved to `localStorage` (`jy-active-design`) |
| Env | `REACT_APP_DESIGN=studio-cloud` (see `.env`) |
| Force switcher | `?designSwitcher=1` or `REACT_APP_DESIGN_SWITCHER=1` |

Current packs:

| id | Name | Status |
|----|------|--------|
| `classic-bw` | Classic B&W | ready |
| `studio-cloud` | Studio Cloud | ready |
| `ultramarine-dream` | Ultramarine Dream | wip |
| `wealth-minimal` | Wealth Minimal | ready |
| `ink-folio` | Ink Folio | ready |
| `split-rail` | Split Rail | ready |
| `research-paper` | Research Paper | ready |

## Add a new design

1. Copy a ready pack (or start empty):

```bash
# example
mkdir src/designs/my-new-design
```

2. Required files:

```
my-new-design/
  DESIGN.md          # art direction for THIS design only
  index.js           # export { Home, BlogPage?, meta }
  pages/Home.jsx     # (or .js)
  # optional: components/, styles/, ASSETS.md, assets/
```

3. `index.js` shape:

```js
import Home from './pages/Home';

export const meta = {
  id: 'my-new-design',
  name: 'My New Design',
  status: 'wip', // or 'ready'
};

export { Home };
export default { meta, Home };
```

4. Register in [`registry.js`](./registry.js):
   - add to `DESIGN_META`
   - add loader: `'my-new-design': () => import('./my-new-design')`

5. Import shared files with:

```js
import cloud from '../../../assets/images/cloud (1).png';
```

Design-only assets can live in `my-new-design/assets/`.

## Rules of thumb

- **One `DESIGN.md` per design** — don’t mix directions in a single doc.
- **Share** fonts / project videos / pfp frames via `src/assets`.
- Keep implementation inside the design folder; `src/index.js` only mounts `DesignRoot`.
