import Link from "next/link";
import { caseHref } from "@/content";

const GOALS = [
  { id: "chess", label: "2000 Elo", meta: "from 1000" },
  { id: "ironman", label: "Ironman", meta: "140.6" },
] as const;

type Props = {
  siteRoot?: string;
};

export default function GoalsList({ siteRoot = "" }: Props) {
  const href = caseHref("goals", siteRoot);
  return (
    <ul className="entry-list">
      {GOALS.map((goal) => (
        <li key={goal.id} className="entry">
          <span>
            <Link href={href}>{goal.label}</Link>
          </span>
          <span className="entry__meta">{goal.meta}</span>
        </li>
      ))}
    </ul>
  );
}
