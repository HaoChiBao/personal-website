import { useState } from 'react';
import './DesignSwitcher.css';

/**
 * Dev-facing design picker. Hidden in production builds unless
 * ?designSwitcher=1 is present.
 */
export default function DesignSwitcher({ designs, activeId, onChange }) {
  const [open, setOpen] = useState(false);

  const forceShow =
    typeof window !== 'undefined' &&
    new URLSearchParams(window.location.search).has('designSwitcher');

  if (process.env.NODE_ENV === 'production' && !forceShow) return null;

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
