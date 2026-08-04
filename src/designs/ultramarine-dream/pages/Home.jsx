import '../styles/wip.css';

/**
 * Placeholder home for Ultramarine Dream.
 * Implement against DESIGN.md + ASSETS.md in this folder.
 */
export default function Home() {
  return (
    <main className="ultra-wip">
      <p className="ultra-wip-eyebrow">Design · WIP</p>
      <h1>Ultramarine Dream</h1>
      <p className="ultra-wip-body">
        Art direction lives in <code>DESIGN.md</code> and <code>ASSETS.md</code>.
        Switch back anytime with the design picker or{' '}
        <code>?design=classic-bw</code>.
      </p>
    </main>
  );
}
