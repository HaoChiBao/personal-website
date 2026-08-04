import { useEffect } from 'react';
import resume from '../../../assets/files/James_Yang-Resume.pdf';
import projects from '../data/projects';
import '../styles/wealth.css';

export default function Home() {
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'light');
  }, []);

  return (
    <div className="ws-page">
      <header className="ws-nav">
        <div className="ws-nav-inner">
          <a className="ws-nav-brand" href="#top">
            James Yang
          </a>
          <ul className="ws-nav-links">
            <li>
              <a href="#projects">Projects</a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
            <li>
              <a className="ws-nav-cta" href={resume} target="_blank" rel="noreferrer">
                Resume
              </a>
            </li>
          </ul>
        </div>
      </header>

      <main id="top">
        <section className="ws-hero ws-shell">
          <div className="ws-hero-grid">
            <p className="ws-kicker ws-reveal">Software engineer · Toronto</p>
            <h1 className="ws-reveal ws-reveal-delay">
              Build clearly.
              <br />
              Ship calmly.
            </h1>
            <p className="ws-hero-sub ws-reveal ws-reveal-delay">
              I’m James — a chronic builder who turns messy problems into
              simple products. I used to play with Legos. Now I build with code.
            </p>
            <div className="ws-hero-actions ws-reveal ws-reveal-delay-2">
              <a className="ws-btn ws-btn-primary" href="#projects">
                See my work
              </a>
              <a className="ws-btn ws-btn-secondary" href="#contact">
                Get in touch
              </a>
            </div>
          </div>
        </section>

        <section className="ws-section ws-section-alt" id="projects">
          <div className="ws-shell">
            <div className="ws-section-head">
              <h2>Selected work</h2>
              <p className="ws-section-lead">
                Products, contracts, and late nights — kept simple on purpose.
              </p>
            </div>
            <ul className="ws-projects">
              {projects.map((project) => (
                <li className="ws-project" key={project.id}>
                  <div className="ws-project-row">
                    <span className="ws-project-label">{project.label}</span>
                    <div>
                      <p className="ws-project-title">{project.title}</p>
                      <p className="ws-project-detail">{project.detail}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="ws-section" id="about">
          <div className="ws-shell ws-about">
            <div className="ws-section-head">
              <h2>About</h2>
            </div>
            <p>
              I care about clear interfaces, fast feedback loops, and making
              hard systems feel obvious. Based in Toronto. Always building.
            </p>
          </div>
        </section>

        <footer className="ws-footer ws-shell" id="contact">
          <div className="ws-footer-panel">
            <h2>Let’s build something good.</h2>
            <p>Open to interesting problems, sharp teams, and kind people.</p>
            <div className="ws-footer-actions">
              <a className="ws-btn ws-btn-primary" href="mailto:jamesyang663@gmail.com">
                Email me
              </a>
              <a
                className="ws-btn ws-btn-secondary"
                href="https://www.linkedin.com/in/jamesyang03/"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
            </div>
          </div>
          <div className="ws-footer-meta">
            <p>© {new Date().getFullYear()} James Yang</p>
            <ul className="ws-footer-links">
              <li>
                <a href="https://github.com/HaoChiBao" target="_blank" rel="noreferrer">
                  GitHub
                </a>
              </li>
              <li>
                <a href={resume} target="_blank" rel="noreferrer">
                  Resume
                </a>
              </li>
            </ul>
          </div>
        </footer>
      </main>
    </div>
  );
}
