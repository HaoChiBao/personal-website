import type { EducationEntry, Profile } from "@/content";

/** Words that shouldn't count toward a degree's abbreviation. */
const DEGREE_STOPWORDS = new Set(["of", "in", "and", "the"]);

/**
 * "Bachelor of Computer Science" -> "B.CS"
 * First significant word becomes its initial; the rest are combined
 * initials (so multi-word majors like "Computer Science" read as "CS").
 */
function abbreviateDegree(degree: string): string {
  const words = degree
    .split(/\s+/)
    .filter((word) => word && !DEGREE_STOPWORDS.has(word.toLowerCase()));
  if (!words.length) return degree;

  const [first, ...rest] = words;
  const head = first[0]?.toUpperCase() ?? "";
  const tail = rest.map((word) => word[0]?.toUpperCase() ?? "").join("");
  return tail ? `${head}.${tail}` : head;
}

/**
 * Pulls a short graduation snippet out of a free-form date range, e.g.
 * "September 2022 – Expected April 2027" -> "Expected 2027".
 */
function graduationLabel(dates: string): string {
  const years = dates.match(/\d{4}/g);
  const year = years?.[years.length - 1];
  if (!year) return dates;
  return /expected/i.test(dates) ? `Expected ${year}` : year;
}

function educationLine(entry: EducationEntry): string {
  const degree = abbreviateDegree(entry.degree);
  const grad = graduationLabel(entry.dates);
  return [degree, entry.school, grad].filter(Boolean).join(" · ");
}

type Props = {
  profile: Profile;
  education?: EducationEntry;
};

export default function HeroIntro({ profile, education }: Props) {
  return (
    <div className="hero__intro">
      <p className="hero__headline">{profile.headline}</p>
      <p className="hero__bio">{profile.bio}</p>
      {education ? (
        <p className="hero__edu">{educationLine(education)}</p>
      ) : null}
    </div>
  );
}
