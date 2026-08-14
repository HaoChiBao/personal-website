import type { ProjectEntry } from "../types";

const interview_royale: ProjectEntry = {
  id: "interview-royale",
  name: "InterviewRoyale",
  title: "Battle-royale mock interviews at DeltaHacks 12",
  blurb:
    "Compete against bots and friends on behavioral questions, then get graded and climb a live leaderboard.",
  dates: "2026",
  section: "hackathons",
  hackathon: {
    event: "DeltaHacks 12",
    year: 2026,
    notes: "Placement / awards TBD",
  },
  labels: ["hackathon", "agents"],
  stack: ["Next.js", "TypeScript", "OpenAI", "WebSockets", "Tailwind"],
  links: [
    {
      label: "devpost",
      href: "https://devpost.com/software/interviewroyale",
      external: true,
    },
    {
      label: "site",
      href: "https://interviewroyale.com/",
      external: true,
    },
    {
      label: "github",
      href: "https://github.com/HaoChiBao/interview-royale",
      external: true,
    },
  ],
  role: "Builder",
  summary:
    "InterviewRoyale (DeltaHacks 12) turns behavioral interview practice into a battle-royale arena. Players join a room, record video answers, get graded, and climb a live leaderboard against bots or friends.",
  contributions: [
    "Built the room flow, video answers, and leaderboard so practice feels like a match instead of a form.",
    "Used browser recording and avatar overlays so faces sit on stick-figure bodies in the arena.",
  ],
  outcomes: ["Shipped a live site at interviewroyale.com from DeltaHacks 12."],
};

export default interview_royale;
