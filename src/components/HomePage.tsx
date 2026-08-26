import AwardsStrip from "@/components/AwardsStrip";
import CopyEmailLink from "@/components/CopyEmailLink";
import GithubContributions from "@/components/GithubContributions";
import FlickerName from "@/components/FlickerName";
import GoalsList from "@/components/GoalsList";
import HeroIntro from "@/components/HeroIntro";
import ProjectList from "@/components/ProjectList";
import WorkList from "@/components/WorkList";
import {
  SECTIONS,
  education,
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
        <HeroIntro profile={profile} education={education[0]} />
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

      <AwardsStrip siteRoot={siteRoot} />

      <section className="section" id="work">
        <h2>{SECTIONS.work.title}</h2>
        <WorkList work={work} siteRoot={siteRoot} />
      </section>

      <section className="section" id="goals">
        <h2>{SECTIONS.goals.title}</h2>
        <GoalsList siteRoot={siteRoot} />
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
