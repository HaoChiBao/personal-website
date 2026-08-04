import { useEffect, useMemo, useState } from 'react';
import resume from '../../../assets/files/James_Yang-Resume.pdf';
import pfp from '../../../assets/images/pfp/pfp (1).png';
import cloud1 from '../../../assets/images/cloud (1).png';
import cloud2 from '../../../assets/images/cloud (2).png';
import projects from '../data/projects';
import highlights from '../data/highlights';
import stack, { stackFilters } from '../data/stack';
import '../styles/ink.css';

const GITHUB = 'https://github.com/HaoChiBao';
const LINKEDIN = 'https://www.linkedin.com/in/jamesyang03/';
const EMAIL = 'mailto:jamesyang663@gmail.com';

function IconGithub() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.52 2.87 8.35 6.84 9.7.5.1.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.55-1.14-4.55-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.27 2.75 1.05A9.3 9.3 0 0 1 12 6.84c.85 0 1.71.12 2.51.35 1.9-1.32 2.74-1.05 2.74-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.59.69.48A10.03 10.03 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z" />
    </svg>
  );
}

function IconLinkedIn() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M6.94 6.5A2.06 2.06 0 1 1 4.88 4.44 2.06 2.06 0 0 1 6.94 6.5ZM7 8.86H4.75V19.5H7Zm4.35 0H9.12V19.5h2.22v-5.55c0-1.46.68-2.4 2.02-2.4 1.27 0 1.88.9 1.88 2.4V19.5h2.23v-6.1c0-3.04-1.62-4.45-3.79-4.45a3.35 3.35 0 0 0-2.73 1.36h-.05V8.86Z" />
    </svg>
  );
}

function IconMail() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

function IconExternal() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M14 5h5v5" />
      <path d="M10 14 19 5" />
      <path d="M19 14v4a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h4" />
    </svg>
  );
}

function IconPin() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M12 21s6-5.2 6-11a6 6 0 1 0-12 0c0 5.8 6 11 6 11Z" />
      <circle cx="12" cy="10" r="2.2" />
    </svg>
  );
}

function IconSun() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}

function IconMoon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4 7 7 0 0 0 20 14.5Z" />
    </svg>
  );
}

export default function Home() {
  const [filter, setFilter] = useState('all');
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const visibleStack = useMemo(() => {
    if (filter === 'all') return stack;
    return stack.filter((item) => item.group === filter);
  }, [filter]);

  return (
    <div className="ink-page" data-ink-theme={theme}>
      <header className="ink-nav">
        <div className="ink-nav-inner">
          <a className="ink-brand" href="#top">
            James
          </a>
          <div className="ink-nav-right">
            <ul className="ink-nav-links">
              <li>
                <a href="#top">Home</a>
              </li>
              <li>
                <a href="#projects">Projects</a>
              </li>
              <li>
                <a href="#stack">Stack</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
            </ul>
            <button
              type="button"
              className="ink-theme-btn"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
            >
              {theme === 'dark' ? <IconSun /> : <IconMoon />}
            </button>
          </div>
        </div>
      </header>

      <main className="ink-shell" id="top">
        <section className="ink-hero">
          <div className="ink-banner ink-reveal">
            <img className="ink-banner-cloud a" src={cloud1} alt="" />
            <img className="ink-banner-cloud b" src={cloud2} alt="" />
          </div>
          <div className="ink-profile ink-reveal ink-reveal-d1">
            <img className="ink-avatar" src={pfp} alt="James Yang" />
            <div className="ink-profile-copy">
              <h1>James Yang</h1>
              <p className="ink-role">Software Engineer · Chronic Builder</p>
              <p className="ink-location">
                <IconPin />
                Toronto, Canada
              </p>
            </div>
          </div>
        </section>

        <hr className="ink-rule" />

        <section className="ink-section ink-reveal ink-reveal-d2" id="about">
          <div className="ink-section-head">
            <h2>About</h2>
          </div>
          <ul className="ink-about-list">
            <li>
              I used to play with Legos. Now I build with code — products, agents, and tools that feel
              obvious under pressure.
            </li>
            <li>
              Day to day I ship with <strong>React</strong>, <strong>TypeScript</strong>, and{' '}
              <strong>Python</strong>, and I care a lot about clear interfaces and fast feedback loops.
            </li>
            <li>
              Recently: contract work on Boardy, shipping Nodes, interning at RBC, and winning UofTHacks
              with a physical voice AI.
            </li>
          </ul>
        </section>

        <hr className="ink-rule" />

        <section className="ink-section" id="contact">
          <div className="ink-section-head">
            <h2>Contact</h2>
          </div>
          <ul className="ink-pills">
            <li>
              <a className="ink-pill" href={GITHUB} target="_blank" rel="noreferrer">
                <IconGithub /> GitHub
              </a>
            </li>
            <li>
              <a className="ink-pill" href={LINKEDIN} target="_blank" rel="noreferrer">
                <IconLinkedIn /> LinkedIn
              </a>
            </li>
            <li>
              <a className="ink-pill" href={EMAIL}>
                <IconMail /> Mail
              </a>
            </li>
            <li>
              <a className="ink-pill" href={resume} target="_blank" rel="noreferrer">
                Resume
              </a>
            </li>
          </ul>
        </section>

        <hr className="ink-rule" />

        <section className="ink-section" id="projects">
          <div className="ink-section-head">
            <h2>Projects</h2>
            <a className="ink-view-all" href={GITHUB} target="_blank" rel="noreferrer">
              View all
            </a>
          </div>
          <ul className="ink-projects">
            {projects.map((project) => (
              <li key={project.id}>
                <article className="ink-card">
                  <div className="ink-card-media">
                    {project.video ? (
                      <video
                        src={project.video}
                        muted
                        loop
                        playsInline
                        autoPlay
                        preload="metadata"
                      />
                    ) : (
                      <img src={project.image} alt="" />
                    )}
                  </div>
                  <div className="ink-card-body">
                    <div className="ink-card-top">
                      <h3 className="ink-card-title">{project.title}</h3>
                      <span className="ink-badge">{project.status}</span>
                    </div>
                    <p className="ink-card-desc">{project.description}</p>
                    <div className="ink-card-footer">
                      <ul className="ink-tags">
                        {project.tags.map((tag) => (
                          <li className="ink-tag" key={tag}>
                            {tag}
                          </li>
                        ))}
                      </ul>
                      <div className="ink-card-links">
                        {project.href ? (
                          <a
                            className="ink-icon-link"
                            href={project.href}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={`${project.title} on GitHub`}
                          >
                            <IconGithub />
                          </a>
                        ) : null}
                        {project.live ? (
                          <a
                            className="ink-icon-link"
                            href={project.live}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={`${project.title} live site`}
                          >
                            <IconExternal />
                          </a>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </section>

        <hr className="ink-rule" />

        <section className="ink-section" id="stack">
          <div className="ink-section-head">
            <h2>Tech Stack</h2>
          </div>
          <ul className="ink-stack-filters">
            {stackFilters.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  aria-pressed={filter === item.id}
                  onClick={() => setFilter(item.id)}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
          <ul className="ink-stack-grid">
            {visibleStack.map((item) => (
              <li className="ink-stack-chip" key={item.name}>
                <span className="ink-stack-dot" aria-hidden="true" />
                {item.name}
              </li>
            ))}
          </ul>
        </section>

        <hr className="ink-rule" />

        <section className="ink-section" id="activity">
          <div className="ink-section-head">
            <h2>GitHub Activity</h2>
          </div>
          <div className="ink-gh-wrap">
            <img
              src="https://ghchart.rshah.org/3dd68c/HaoChiBao"
              alt="GitHub contribution chart for HaoChiBao"
              loading="lazy"
            />
            <p className="ink-gh-note">
              Contributions on{' '}
              <a href={GITHUB} target="_blank" rel="noreferrer">
                @HaoChiBao
              </a>
            </p>
          </div>
        </section>

        <hr className="ink-rule" />

        <section className="ink-section" id="highlights">
          <div className="ink-section-head">
            <h2>Highlights</h2>
          </div>
          <ul className="ink-highlights">
            {highlights.map((item) => (
              <li className="ink-highlight" key={item.id}>
                <div className="ink-highlight-top">
                  <div className="ink-highlight-avatar" aria-hidden="true">
                    {item.name.slice(0, 1)}
                  </div>
                  <div>
                    <p className="ink-highlight-name">{item.name}</p>
                    <p className="ink-highlight-handle">{item.handle}</p>
                  </div>
                </div>
                <p className="ink-highlight-quote">{item.quote}</p>
              </li>
            ))}
          </ul>
        </section>

        <hr className="ink-rule" />

        <section className="ink-cta">
          <h2>Scrolled Too Far</h2>
          <p>If you’ve read this far, you might be interested in what I do.</p>
          <a className="ink-cta-btn" href={EMAIL}>
            Let’s Talk →
          </a>
        </section>

        <footer className="ink-footer">
          <blockquote className="ink-quote">
            “I used to play with Legos, now I build with code.”
            <cite>— James Yang</cite>
          </blockquote>
          <p className="ink-copy">
            Designed & developed by James · © {new Date().getFullYear()}. All rights reserved.
          </p>
        </footer>
      </main>
    </div>
  );
}
