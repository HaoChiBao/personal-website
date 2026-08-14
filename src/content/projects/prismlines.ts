import type { ProjectEntry } from "../types";

const prismlines: ProjectEntry = {
  id: "prismlines",
  name: "PrismLines",
  title: "Best UI/UX at NexHacks (Carnegie Mellon)",
  blurb:
    "LangGraph trading agents that turn Polymarket research and parlays into a draw-a-line visual flow.",
  dates: "2026",
  section: "hackathons",
  hackathon: { event: "NexHacks", year: 2026, placement: "Best UI/UX" },
  labels: [
      "hackathon",
      "award",
      "featured",
      "agents",
      "fintech",
    ],
  stack: [
      "LangGraph",
      "OpenAI",
      "Polymarket",
      "Tavily",
      "React",
      "TypeScript",
      "Supabase",
    ],
  links: [
    {
      label: "devpost",
      href: "https://devpost.com/software/hello-1eub4p",
      external: true,
    },
    {
      label: "site",
      href: "https://prismlines.com/",
      external: true,
    },
  ],
  role: "Builder",
  summary:
    "PrismLines won Best UI/UX (add-on track) at NexHacks. It is an end-to-end Polymarket assistant: agents research a topic, frame risk like TradFi, and let you draw lines between markets to build parlays.",
  contributions: [
    "Orchestrated research and strategy agents in LangGraph with schema-validated handoffs.",
    "Designed the visual parlay builder so multi-leg bets are drawn as connections, not forms.",
  ],
  outcomes: [
    "Best UI/UX — Add-on Track at NexHacks (Carnegie Mellon).",
  ],
};

export default prismlines;
