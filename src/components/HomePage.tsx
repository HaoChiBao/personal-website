import CopyEmailLink from "@/components/CopyEmailLink";
import GithubContributions from "@/components/GithubContributions";
import FlickerName from "@/components/FlickerName";
import ProjectList from "@/components/ProjectList";
import Link from "next/link";
import {
  SECTIONS,
  caseHref,
  listHackathonProjects,
  listOpenSource,
  listPersonalProjects,
  listWork,
  profile,
} from "@/content";
import { preload } from "react-dom";
import { loadLetterVariants } from "@/lib/letter-assets";
import { firstVariantUrls } from "@/lib/letter-urls";

const GITHUB_USER = "HaoChiBao";

type Props = {
  siteRoot?: string;
};

export default function HomePage({ siteRoot = "" }: Props) {
  const work = listWork();
  const opensource = listOpenSource({ featured: true });
  const projects = listPersonalProjects({ featured: true });
  const hackathons = listHackathonProjects({ featured: true });
  const letterVariants = loadLetterVariants();
  for (const href of firstVariantUrls(profile.name, letterVariants)) {
    preload(href, { as: "image", fetchPriority: "high" });
  }

  const links = profile.links.filter((l) =>
    ["email", "github", "linkedin", "resume"].includes(l.label),
  );
  const githubHref =
    profile.links.find((l) => l.label === "github")?.href ??
    `https://github.com/${GITHUB_USER}`;

  return (
    <main>
      <header className="hero">
        <FlickerName text={profile.name} variants={letterVariants} />
        <p className="hero__links">
          {links.map((link, i) => (
            <span key={link.href}>
              {i > 0 ? " · " : null}
              {link.label === "email" ? (
                <CopyEmailLink email={profile.email} label={link.label} />
              ) : (
                <a
                  href={link.href}
                  {...(link.external
                    ? { target: "_blank", rel: "noreferrer" }
                    : {})}
                >
                  {link.label}
                </a>
              )}
            </span>
          ))}
        </p>
      </header>

      <section className="section" id="work">
        <h2>{SECTIONS.work.title}</h2>
        <ul className="entry-list">
          {work.map((job) => {
            const caseId = job.projectIds?.[0];
            return (
              <li key={job.id} className="entry">
                <span>
                  {caseId ? (
                    <Link href={caseHref(caseId, siteRoot)}>{job.org}</Link>
                  ) : job.href ? (
                    <a href={job.href} target="_blank" rel="noreferrer">
                      {job.org}
                    </a>
                  ) : (
                    job.org
                  )}
                </span>
                <span className="entry__meta">{job.dates}</span>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="section" id="opensource">
        <h2>{SECTIONS.opensource.title}</h2>
        <ProjectList items={opensource} siteRoot={siteRoot} />
      </section>

      <section className="section" id="projects">
        <h2>{SECTIONS.projects.title}</h2>
        <ProjectList items={projects} siteRoot={siteRoot} />
      </section>

      <section className="section" id="hackathons">
        <h2>{SECTIONS.hackathons.title}</h2>
        <ProjectList items={hackathons} siteRoot={siteRoot} />
      </section>

      <GithubContributions username={GITHUB_USER} href={githubHref} />
    </main>
  );
}
