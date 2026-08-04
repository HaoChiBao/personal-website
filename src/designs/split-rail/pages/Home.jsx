import { useEffect } from 'react';
import {
  awards,
  featured,
  hackathons,
  links,
  profile,
  work,
} from '../data/content';
import '../styles/split.css';

function ExtLink({ href, children, className = '' }) {
  if (!href) return <span className={className}>{children}</span>;
  return (
    <a className={`sr-link ${className}`.trim()} href={href} target="_blank" rel="noreferrer">
      {children}
      <span aria-hidden="true"> ↗</span>
    </a>
  );
}

function ProjectItem({ project }) {
  return (
    <li className="sr-project">
      <div className="sr-project-top">
        <h3 className="sr-title sr-c-org">{project.title}</h3>
        <p className="sr-meta sr-c-3">{project.meta}</p>
      </div>
      <p className="sr-project-desc">{project.description}</p>
      <p className="sr-body-sm sr-c-3 sr-project-stack">{project.stack}</p>
      {project.links?.length ? (
        <div className="sr-project-links">
          {project.links.map((link) => (
            <ExtLink key={link.label + link.href} href={link.href}>
              {link.label}
            </ExtLink>
          ))}
        </div>
      ) : null}
    </li>
  );
}

export default function Home() {
  useEffect(() => {
    document.documentElement.removeAttribute('data-theme');
  }, []);

  return (
    <div className="sr-page">
      <div className="sr-pad">
        <div className="sr-grid">
          <header className="sr-rail">
            <div>
              <h1 className="sr-name">{profile.name}</h1>
              <p className="sr-bio sr-c-2">
                {profile.bioLead}
                <span className="sr-arc-word">
                  {profile.bioArc}
                  <svg className="sr-arc" viewBox="0 0 100 24" preserveAspectRatio="none" aria-hidden="true">
                    <path pathLength="1" d="M 2 22 Q 50 1 98 22" />
                  </svg>
                </span>
                {profile.bioTail}
              </p>

              <h2 className="sr-eyebrow">Work</h2>
              <ol className="sr-work">
                {work.map((job) => (
                  <li key={`${job.org}-${job.role}`}>
                    <p className="sr-title sr-c-org">
                      <ExtLink href={job.href}>{job.org}</ExtLink>
                      <span className="sr-meta sr-c-3"> · </span>
                      <span className="sr-meta sr-c-3 sr-swap">
                        <span className="sr-swap-out">{job.role}</span>
                        <span className="sr-swap-in" aria-hidden="true">
                          {job.dates}
                        </span>
                      </span>
                    </p>
                  </li>
                ))}
              </ol>
            </div>

            <nav className="sr-rail-nav" aria-label="Contact">
              <a className="sr-link" href={links.email}>
                email
              </a>
              <ExtLink href={links.github}>github</ExtLink>
              <ExtLink href={links.linkedin}>linkedin</ExtLink>
              <ExtLink href={links.resume}>resume</ExtLink>
            </nav>
          </header>

          <main className="sr-main sr-projects">
            <section className="sr-section">
              <div className="sr-section-head">
                <h2 className="sr-eyebrow">
                  Featured
                  <span className="sr-star" aria-hidden="true">
                    ★
                  </span>
                </h2>
              </div>
              <ul className="sr-project-list">
                {featured.map((project) => (
                  <ProjectItem key={project.id} project={project} />
                ))}
              </ul>
            </section>

            <section className="sr-section">
              <div className="sr-section-head">
                <h2 className="sr-eyebrow">
                  Hackathon ({hackathons.length})
                  <span className="sr-star" aria-hidden="true">
                    ★
                  </span>
                </h2>
              </div>
              <ul className="sr-project-list">
                {hackathons.map((project) => (
                  <ProjectItem key={project.id} project={project} />
                ))}
              </ul>
            </section>

            <section className="sr-section">
              <h2 className="sr-eyebrow">Other Awards</h2>
              <p className="sr-awards">{awards}</p>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
