import Link from "next/link";
import { caseHref, type ProjectEntry } from "@/content";

type Props = {
  items: ProjectEntry[];
  siteRoot?: string;
};

function entryMeta(project: ProjectEntry): string {
  const { hackathon, dates } = project;
  if (!hackathon) return dates;
  if (hackathon.placement) return hackathon.placement;
  return String(hackathon.year || dates);
}

export default function ProjectList({ items, siteRoot = "" }: Props) {
  if (items.length === 0) return null;

  return (
    <ul className="entry-list">
      {items.map((project) => (
        <li key={project.id} className="entry">
          <span>
            <Link href={caseHref(project.id, siteRoot)}>{project.name}</Link>
            {project.hackathon?.event ? (
              <span className="entry__meta"> · {project.hackathon.event}</span>
            ) : null}
          </span>
          <span className="entry__meta">{entryMeta(project)}</span>
        </li>
      ))}
    </ul>
  );
}
