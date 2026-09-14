import Link from "next/link";
import { caseHref, type WorkEntry } from "@/content";

type Props = {
  work: WorkEntry[];
  siteRoot?: string;
};

export default function WorkList({ work, siteRoot = "" }: Props) {
  if (work.length === 0) return null;

  return (
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
            <span className="entry__meta">{job.role}</span>
          </li>
        );
      })}
    </ul>
  );
}
