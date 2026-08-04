import { useEffect, useMemo } from 'react';
import {
  abstract,
  correspondence,
  figures,
  keywords,
  meta,
  references,
  results,
} from '../data/paper';
import '../styles/paper.css';

function Cite({ n }) {
  return (
    <a className="rp-cite" href={`#ref-${n}`} aria-label={`Reference ${n}`}>
      [{n}]
    </a>
  );
}

function Figure({ figure }) {
  if (!figure) return null;
  return (
    <figure className="rp-figure" id={figure.id}>
      <div className="rp-figure-frame">
        {figure.video ? (
          <video src={figure.video} muted loop playsInline autoPlay preload="metadata" />
        ) : (
          <img src={figure.image} alt="" />
        )}
      </div>
      <figcaption className="rp-caption">
        <strong>{figure.label}.</strong> {figure.caption}
      </figcaption>
    </figure>
  );
}

export default function Home() {
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'light');
  }, []);

  const figureMap = useMemo(() => {
    const map = {};
    figures.forEach((f) => {
      map[f.id] = f;
    });
    return map;
  }, []);

  return (
    <div className="rp-page">
      <article className="rp-sheet">
        <header className="rp-running">
          <span>{meta.shortTitle}</span>
          <span>
            {meta.volume} · {meta.date}
          </span>
        </header>

        <div className="rp-masthead rp-reveal">
          <p className="rp-journal">
            {meta.journal} · {meta.doi}
          </p>
          <h1 className="rp-title">{meta.title}</h1>
          <p className="rp-author">{meta.author}</p>
          <p className="rp-affil">{meta.affiliation}</p>
          <p className="rp-corr">
            Correspondence:{' '}
            <a href={correspondence.email}>{meta.email}</a>
          </p>
        </div>

        <section className="rp-abstract rp-reveal" aria-label="Abstract">
          <span className="rp-abstract-label">Abstract</span>
          <p>{abstract}</p>
          <p className="rp-keywords">
            <strong>Keywords</strong>
            {keywords.join('; ')}.
          </p>
        </section>

        <section className="rp-section" id="introduction">
          <h2>1. Introduction</h2>
          <p>
            I used to play with Legos. Now I build with code. The through-line is the same:
            assemble small pieces until a system feels inevitable. This page is a short
            manuscript of that practice — not a complete curriculum vitae, but a readable
            account of recent work and how it was approached.
          </p>
          <p>
            The claim is modest: software is easier to trust when interfaces are clear and
            feedback loops are short. The following sections summarize methods, present
            selected results <Cite n={1} />
            <Cite n={2} />
            <Cite n={3} />
            <Cite n={4} />, and point to further material in the references.
          </p>
        </section>

        <section className="rp-section" id="methods">
          <h2>2. Methods</h2>
          <p>
            Work proceeds by shipping thin vertical slices, instrumenting what breaks, and
            rewriting until edge cases stop surprising users. Stack choices follow the
            constraint: TypeScript and Python for agent platforms; browser APIs for
            page-local tools; React with enterprise backends for dashboards; on-device models
            when latency and privacy matter more than peak model quality.
          </p>
          <p>
            Collaboration modes vary — contract pods, bank engineering teams, solo product
            loops, and weekend hackathon crews — but the evaluation criterion stays
            consistent: does the artifact help someone finish a real task faster?
          </p>
        </section>

        <section className="rp-section" id="results">
          <h2>3. Results</h2>
          {results.map((item, index) => (
            <div className="rp-result" key={item.id} id={item.id}>
              <h3>
                3.{index + 1} {item.title} <Cite n={item.cite} />
              </h3>
              <p>{item.body}</p>
              <p className="rp-result-stack">Materials: {item.stack}</p>
              <Figure figure={figureMap[item.figure]} />
            </div>
          ))}
        </section>

        <section className="rp-section" id="discussion">
          <h2>4. Discussion</h2>
          <p>
            Across these projects, the highest leverage was rarely a novel algorithm. It was
            making messy reality — brittle APIs, obfuscated emails, heavy datasets, noisy rooms
            — feel navigable. Failures taught the same lesson as successes: observability and
            defaults beat cleverness that only works in a demo.
          </p>
          <p>
            Limitations of this note include incomplete longitudinal metrics and a bias toward
            work that photographs well as a figure. A fuller history appears in the curriculum
            vitae <Cite n={5} />.
          </p>
        </section>

        <section className="rp-section" id="conclusion">
          <h2>5. Conclusion</h2>
          <p>
            Building clearly is a habit, not a theme. The invitation is simple: if you have an
            interesting problem, sharp teammates, or a stubborn workflow that deserves a
            better tool, write to the corresponding author.
          </p>
        </section>

        <section className="rp-section" id="references">
          <h2>References</h2>
          <ol className="rp-refs">
            {references.map((ref) => (
              <li key={ref.id} id={`ref-${ref.id}`}>
                {ref.href ? (
                  <a href={ref.href} target="_blank" rel="noreferrer">
                    {ref.text}
                  </a>
                ) : (
                  ref.text
                )}
              </li>
            ))}
          </ol>
        </section>

        <footer className="rp-colophon">
          <span>
            © {new Date().getFullYear()} {meta.author}
          </span>
          <span>
            <a href={correspondence.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
            {' · '}
            <a href={correspondence.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            {' · '}
            <a href={correspondence.resume} target="_blank" rel="noreferrer">
              CV (PDF)
            </a>
          </span>
        </footer>
      </article>
    </div>
  );
}
