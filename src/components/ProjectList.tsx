import type { ProjectEntry } from "@/content";

type Props = {
  items: ProjectEntry[];
};

function entryMeta(project: ProjectEntry): string {
  const { hackathon, dates } = project;
  if (!hackathon) return dates;
  if (hackathon.placement) return hackathon.placement;
  return String(hackathon.year || dates);
}

export default function ProjectList({ items }: Props) {
  if (items.length === 0) return null;

  return (
    <ul className="entry-list">
      {items.map((project) => (
        <li key={project.id} className="entry">
          <span>
            {project.links[0] ? (
              <a
                href={project.links[0].href}
                {...(project.links[0].external
                  ? { target: "_blank", rel: "noreferrer" }
                  : {})}
              >
                {project.name}
              </a>
            ) : (
              project.name
            )}
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
