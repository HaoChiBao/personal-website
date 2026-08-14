import type { ProjectEntry } from "../types";

const cota: ProjectEntry = {
  id: "cota",
  name: "coTA",
  title: "Best Education Hack at DeltaHacks X",
  blurb:
    "Monkey-see tutoring: watch a problem get worked, then try it yourself.",
  dates: "2024",
  section: "hackathons",
  hackathon: { event: "DeltaHacks X", year: 2024, placement: "Best Education Hack" },
  labels: ["hackathon", "award", "featured", "education"],
  stack: [
      "Cohere",
      "FastAPI",
      "React",
      "Tailwind",
    ],
  links: [
    {
      label: "devpost",
      href: "https://devpost.com/software/cota",
      external: true,
    },
    {
      label: "github",
      href: "https://github.com/Nick1093/Delta-Hacks-X",
      external: true,
    },
  ],
  role: "Builder",
  summary:
    "coTA won Best Education Hack at DeltaHacks X. The idea is monkey-see monkey-learn: the app works a problem in front of you, then hands you the pen so you have to do the next one.",
  contributions: [
    "Built the teach-then-try loop on Cohere and FastAPI.",
    "Shipped the React/Tailwind practice UI for the education track.",
  ],
  outcomes: [
    "Best Education Hack at DeltaHacks X.",
  ],
};

export default cota;
