/**
 * Design registry — add a folder under src/designs/<id>/ with index.js + DESIGN.md,
 * then register it here.
 *
 * Switch designs:
 *   - URL:     ?design=classic-bw
 *   - Storage: localStorage key `jy-active-design`
 *   - Env:     REACT_APP_DESIGN=classic-bw
 *   - Dev UI:  floating switcher (bottom-right)
 */

export const DESIGN_META = [
  {
    id: 'classic-bw',
    name: 'Classic B&W',
    status: 'ready',
    summary: 'Original black & white profile card site',
  },
  {
    id: 'studio-cloud',
    name: 'Studio Cloud',
    status: 'ready',
    summary: 'Cloud intro + highlights layout',
  },
  {
    id: 'ultramarine-dream',
    name: 'Ultramarine Dream',
    status: 'wip',
    summary: 'Ethereal ultramarine art direction (in progress)',
  },
  {
    id: 'wealth-minimal',
    name: 'Wealth Minimal',
    status: 'ready',
    summary: 'Warm neutrals + lime CTAs, Wealthsimple-inspired',
  },
  {
    id: 'ink-folio',
    name: 'Ink Folio',
    status: 'ready',
    summary: 'Dark serif portfolio — banner, cards, stack, GitHub',
  },
  {
    id: 'split-rail',
    name: 'Split Rail',
    status: 'ready',
    summary: 'Two-column sticky rail résumé — nathanwan-style',
  },
  {
    id: 'research-paper',
    name: 'Research Paper',
    status: 'ready',
    summary: 'Manuscript layout — abstract, sections, figures, refs',
  },
];

const loaders = {
  'classic-bw': () => import('./classic-bw'),
  'studio-cloud': () => import('./studio-cloud'),
  'ultramarine-dream': () => import('./ultramarine-dream'),
  'wealth-minimal': () => import('./wealth-minimal'),
  'ink-folio': () => import('./ink-folio'),
  'split-rail': () => import('./split-rail'),
  'research-paper': () => import('./research-paper'),
};

const STORAGE_KEY = 'jy-active-design';

export function listDesigns() {
  return DESIGN_META.slice();
}

export function isValidDesignId(id) {
  return Boolean(id && loaders[id]);
}

export function getActiveDesignId() {
  if (typeof window !== 'undefined') {
    const fromUrl = new URLSearchParams(window.location.search).get('design');
    if (isValidDesignId(fromUrl)) return fromUrl;

    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (isValidDesignId(stored)) return stored;
    } catch {
      /* ignore */
    }
  }

  const fromEnv = process.env.REACT_APP_DESIGN;
  if (isValidDesignId(fromEnv)) return fromEnv;

  return 'classic-bw';
}

export function setActiveDesignId(id) {
  if (!isValidDesignId(id)) return;
  try {
    window.localStorage.setItem(STORAGE_KEY, id);
  } catch {
    /* ignore */
  }
}

export async function loadDesign(id) {
  const key = isValidDesignId(id) ? id : 'classic-bw';
  const mod = await loaders[key]();
  return mod.default || mod;
}
