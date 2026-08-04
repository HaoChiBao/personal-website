import { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import {
  getActiveDesignId,
  listDesigns,
  loadDesign,
  setActiveDesignId,
} from './registry';
import DesignSwitcher from './DesignSwitcher';

function BootScreen() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: '#050505',
        color: '#fff',
        display: 'grid',
        placeItems: 'center',
        fontFamily: 'Aeonik, system-ui, sans-serif',
        fontSize: 14,
        letterSpacing: '0.04em',
      }}
    >
      Loading design…
    </div>
  );
}

export default function DesignRoot() {
  const [designId, setDesignId] = useState(() => getActiveDesignId());
  const [pack, setPack] = useState(null);

  useEffect(() => {
    // Persist URL ?design= into localStorage
    const fromUrl = new URLSearchParams(window.location.search).get('design');
    if (fromUrl) setActiveDesignId(fromUrl);
  }, []);

  useEffect(() => {
    let cancelled = false;
    setPack(null);
    loadDesign(designId).then((mod) => {
      if (!cancelled) setPack(mod);
    });
    return () => {
      cancelled = true;
    };
  }, [designId]);

  const switchDesign = (nextId) => {
    setActiveDesignId(nextId);
    setDesignId(nextId);
    const url = new URL(window.location.href);
    url.searchParams.set('design', nextId);
    // Drop path back to home when switching designs
    url.pathname = '/';
    window.history.replaceState({}, '', url);
  };

  if (!pack?.Home) return <BootScreen />;

  const { Home, BlogPage } = pack;

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        {BlogPage ? <Route path="/blog/:id" element={<BlogPage />} /> : null}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <DesignSwitcher
        designs={listDesigns()}
        activeId={designId}
        onChange={switchDesign}
      />
    </>
  );
}
