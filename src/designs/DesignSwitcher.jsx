import { useState } from 'react';
import './DesignSwitcher.css';

/**
 * Design picker — shown in local dev and on the Vercel `testing` preview.
 * Hidden on production (master / jamesyang.ca).
 */
function shouldShowDesignSwitcher() {
  if (process.env.NODE_ENV !== 'production') return true;
  if (process.env.REACT_APP_DESIGN_SWITCHER === '1') return true;

  // Injected at build time by scripts/embed-vercel-meta.js on Vercel
  if (process.env.REACT_APP_GIT_BRANCH === 'testing') return true;

  if (typeof window === 'undefined') return false;

  const params = new URLSearchParams(window.location.search);
  if (params.has('designSwitcher')) return true;

  // Fallback: Vercel branch alias host
  // personal-website-git-testing-<team>.vercel.app
  const host = window.location.hostname;
  if (host.includes('-git-testing-')) return true;

  return false;
}

export default function DesignSwitcher({ designs, activeId, onChange }) {
  const [open, setOpen] = useState(false);

  if (!shouldShowDesignSwitcher()) return null;

  const active = designs.find((d) => d.id === activeId) || designs[0];

  return (
    <div className={`design-switcher${open ? ' is-open' : ''}`}>
      <button
        type="button"
        className="design-switcher-toggle"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        title="Switch design"
      >
        Design: {active?.name || activeId}
      </button>

      {open && (
        <ul className="design-switcher-menu">
          {designs.map((d) => (
            <li key={d.id}>
              <button
                type="button"
                className={d.id === activeId ? 'is-active' : undefined}
                onClick={() => {
                  onChange(d.id);
                  setOpen(false);
                }}
              >
                <span className="design-switcher-name">{d.name}</span>
                <span className={`design-switcher-status is-${d.status}`}>
                  {d.status}
                </span>
                {d.summary ? (
                  <span className="design-switcher-summary">{d.summary}</span>
                ) : null}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
