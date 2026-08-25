import Link from "next/link";
import { SECTIONS, awards, caseHref } from "@/content";

/**
 * Curated ids to surface on the homepage strip, in display order.
 * Keep this short — titles only, details live on case pages.
 */
const FEATURED_AWARD_IDS = [
  "rbc-industry-disruptor",
  "uofthacks-1st",
  "hackharvard",
  "nexhacks",
] as const;

type Props = {
  siteRoot?: string;
};

export default function AwardsStrip({ siteRoot = "" }: Props) {
  const featured = FEATURED_AWARD_IDS.map((id) =>
    awards.find((a) => a.id === id),
  ).filter((a): a is NonNullable<typeof a> => Boolean(a));

  if (featured.length === 0) return null;

  return (
    <section className="section" id="recognition">
      <h2>{SECTIONS.recognition.title}</h2>
      <ul className="entry-list">
        {featured.map((award) => (
          <li key={award.id} className="entry">
            <span>
              {award.projectId ? (
                <Link href={caseHref(award.projectId, siteRoot)}>
                  {award.title}
                </Link>
              ) : (
                award.title
              )}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
