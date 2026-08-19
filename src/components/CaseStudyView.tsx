import { existsSync } from "fs";
import path from "path";
import Link from "next/link";
import type { CaseBlock, CaseStudy, ProjectEntry } from "@/content";
import { SECTIONS } from "@/content";

type Props = {
  project: ProjectEntry;
  homeHref?: string;
};

function publicAssetExists(src: string): boolean {
  if (!src.startsWith("/")) return true;
  return existsSync(path.join(process.cwd(), "public", src.replace(/^\//, "")));
}

function storyParagraphs(story: string): string[] {
  return story
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

function buildFallback(project: ProjectEntry): CaseStudy {
  const blocks: CaseBlock[] = [];

  if (project.summary) {
    blocks.push({ type: "paragraph", text: project.summary });
  }

  if (project.story) {
    for (const text of storyParagraphs(project.story)) {
      blocks.push({ type: "paragraph", text });
    }
  }

  if (project.contributions?.length) {
    blocks.push({ type: "heading", text: "Contributions" });
    blocks.push({ type: "list", items: project.contributions });
  }

  if (project.outcomes?.length) {
    blocks.push({ type: "heading", text: "Outcomes" });
    blocks.push({ type: "list", items: project.outcomes });
  }

  return {
    hero: project.media
      ? {
          image: project.media.image,
          video: project.media.video,
          caption: project.media.caption,
        }
      : undefined,
    blocks,
  };
}

function CaseHero({
  hero,
}: {
  hero: NonNullable<CaseStudy["hero"]>;
}) {
  const videoOk = hero.video && publicAssetExists(hero.video);
  const imageOk = hero.image && publicAssetExists(hero.image);
  if (!videoOk && !imageOk) return null;

  return (
    <figure className="case__hero">
      {videoOk ? (
        <video
          className="case__media"
          src={hero.video}
          controls
          playsInline
          preload="metadata"
        />
      ) : (
        <img
          className="case__media"
          src={hero.image}
          alt=""
          loading="lazy"
          decoding="async"
        />
      )}
      {hero.caption ? (
        <figcaption className="case__caption">{hero.caption}</figcaption>
      ) : null}
    </figure>
  );
}

function Block({ block }: { block: CaseBlock }) {
  switch (block.type) {
    case "heading":
      return <h2 className="case__heading">{block.text}</h2>;
    case "paragraph":
      return <p className="case__p">{block.text}</p>;
    case "quote":
      return (
        <blockquote className="case__quote">
          <p>{block.text}</p>
          {block.attribution ? (
            <cite className="case__cite">{block.attribution}</cite>
          ) : null}
        </blockquote>
      );
    case "list":
      return (
        <ul className="case__list">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case "image":
      if (!publicAssetExists(block.src)) return null;
      return (
        <figure className="case__figure">
          <img
            className="case__media"
            src={block.src}
            alt={block.alt}
            loading="lazy"
            decoding="async"
          />
          {block.caption ? (
            <figcaption className="case__caption">{block.caption}</figcaption>
          ) : null}
        </figure>
      );
    case "video":
      if (!publicAssetExists(block.src)) return null;
      return (
        <figure className="case__figure">
          <video
            className="case__media"
            src={block.src}
            controls
            playsInline
            preload="metadata"
          />
          {block.caption ? (
            <figcaption className="case__caption">{block.caption}</figcaption>
          ) : null}
        </figure>
      );
    default:
      return null;
  }
}

export default function CaseStudyView({ project, homeHref = "/" }: Props) {
  const study = project.caseStudy ?? buildFallback(project);
  const title = study.headline ?? project.name;
  const sectionLabel =
    project.section in SECTIONS
      ? SECTIONS[project.section as keyof typeof SECTIONS].title
      : project.section === "work"
        ? "Work"
        : undefined;
  const metaBits = [
    project.dates,
    sectionLabel,
    project.hackathon?.event,
    project.hackathon?.placement,
    project.role,
  ].filter(Boolean);

  return (
    <article className="case">
      <p className="case__back">
        <Link href={homeHref}>← Home</Link>
      </p>

      <header className="case__header">
        <div className="case__heading-row">
          {project.media?.mark && publicAssetExists(project.media.mark) ? (
            <img
              className="case__mark"
              src={project.media.mark}
              alt=""
              width={40}
              height={40}
            />
          ) : null}
          <h1 className="case__title">{title}</h1>
        </div>
        {metaBits.length ? (
          <p className="case__meta">{metaBits.join(" · ")}</p>
        ) : null}
      </header>

      {study.hero ? <CaseHero hero={study.hero} /> : null}

      <div className="case__body">
        {study.blocks.map((block, i) => (
          <Block key={`${block.type}-${i}`} block={block} />
        ))}
      </div>

      {(project.stack.length > 0 || project.links.length > 0) && (
        <footer className="case__footer">
          {project.stack.length > 0 ? (
            <p className="case__stack">
              {project.stack.map((item, i) => (
                <span key={item}>
                  {i > 0 ? " · " : null}
                  {item}
                </span>
              ))}
            </p>
          ) : null}
          {project.links.length > 0 ? (
            <p className="case__links">
              {project.links.map((link, i) => (
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
          ) : null}
        </footer>
      )}
    </article>
  );
}
