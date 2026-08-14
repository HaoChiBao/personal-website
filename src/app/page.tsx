import GithubContributions from "@/components/GithubContributions";
import ProjectList from "@/components/ProjectList";
import {
  SECTIONS,
  listHackathonProjects,
  listOpenSource,
  listPersonalProjects,
  listWork,
  profile,
} from "@/content";

const GITHUB_USER = "HaoChiBao";

export default function Home() {
  const work = listWork();
  const opensource = listOpenSource({ featured: true });
  const projects = listPersonalProjects({ featured: true });
  const hackathons = listHackathonProjects({ featured: true });

  const links = profile.links.filter((l) =>
    ["email", "github", "linkedin", "resume"].includes(l.label),
  );
  const githubHref =
    profile.links.find((l) => l.label === "github")?.href ??
    `https://github.com/${GITHUB_USER}`;

  return (
    <main>
      <header className="hero">
        <h1>{profile.name}</h1>
        <p className="hero__links">
          {links.map((link, i) => (
            <span key={link.href}>
              {i > 0 ? " · " : null}
              <a
                href={link.href}
                {...(link.external
                  ? { target: "_blank", rel: "noreferrer" }
                  : {})}
              >
                {link.label}
              </a>
            </span>
          ))}
        </p>
      </header>

      <section className="section" id="work">
        <h2>{SECTIONS.work.title}</h2>
        <ul className="entry-list">
          {work.map((job) => (
            <li key={job.id} className="entry">
              <span>
                {job.href ? (
                  <a href={job.href} target="_blank" rel="noreferrer">
                    {job.org}
                  </a>
                ) : (
                  job.org
                )}
              </span>
              <span className="entry__meta">{job.dates}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="section" id="opensource">
        <h2>{SECTIONS.opensource.title}</h2>
        <ProjectList items={opensource} />
      </section>

      <section className="section" id="projects">
        <h2>{SECTIONS.projects.title}</h2>
        <ProjectList items={projects} />
      </section>

      <section className="section" id="hackathons">
        <h2>{SECTIONS.hackathons.title}</h2>
        <ProjectList items={hackathons} />
      </section>

      <GithubContributions username={GITHUB_USER} href={githubHref} />
    </main>
  );
}
