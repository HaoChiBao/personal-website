import Link from "next/link";
import { SECTIONS, awards, caseHref } from "@/content";

/**
 * Curated ids to surface on the homepage strip, in display order.
 * Edit this list to change what shows — keep it short (max ~6).
 */
const FEATURED_AWARD_IDS = [
  "rbc-industry-disruptor",
  "uofthacks-1st",
  "hackharvard",
  "overhaul-1st",
  "dataquest-1st",
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
            <span className={award.detail ? "entry__main" : undefined}>
              {award.detail ? (
                <>
                  <span className="entry__title">
                    {award.projectId ? (
                      <Link href={caseHref(award.projectId, siteRoot)}>
                        {award.title}
                      </Link>
                    ) : (
                      award.title
                    )}
                  </span>
                  <span className="entry__blurb">{award.detail}</span>
                </>
              ) : award.projectId ? (
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
