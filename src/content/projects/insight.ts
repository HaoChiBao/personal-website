import type { ProjectEntry } from "../types";

const insight: ProjectEntry = {
  id: "insight",
  name: "INSIGHT",
  title: "3D LinkedIn network map at HopHacks Fall 2025",
  blurb:
    "Chrome extension that turns your LinkedIn graph into a searchable 3D map with pathfinding.",
  dates: "2025",
  section: "hackathons",
  hackathon: { event: "HopHacks Fall", year: 2025, notes: "Placement / awards TBD" },
  labels: [
      "hackathon",
      "extension",
      "tooling",
    ],
  stack: [
      "Chrome extension",
      "Three.js",
      "JavaScript",
      "Python",
    ],
  links: [
    {
      label: "devpost",
      href: "https://devpost.com/software/linkedin-but-better",
      external: true,
    },
    {
      label: "github",
      href: "https://github.com/WilliamxJiang/linkedin-superconnector",
      external: true,
    },
  ],
  role: "Builder",
  summary:
    "INSIGHT (HopHacks Fall 2025) is a LinkedIn Chrome extension that renders your connections as an interactive 3D graph. You can search, pathfind, and see how industries and roles cluster so warm intros are easier to find.",
  contributions: [
    "Injected a Manifest V3 visualizer into LinkedIn with bundled Three.js under CSP.",
    "Added search and pathfinding so hidden bridges in the graph are actually usable.",
  ],
  outcomes: [
    "Submitted at HopHacks Fall 2025 as a working in-page 3D network map.",
  ],
};

export default insight;
