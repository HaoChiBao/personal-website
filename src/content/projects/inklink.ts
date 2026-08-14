import type { ProjectEntry } from "../types";

const inklink: ProjectEntry = {
  id: "inklink",
  name: "InkLink",
  title: "1st place at Overhaul (Western Developer's Society)",
  blurb:
    "Note pages with text-to-speech, built on top of the InkLink starter.",
  dates: "2023",
  section: "hackathons",
  hackathon: { event: "Overhaul", year: 2023, placement: "1st place" },
  labels: ["hackathon", "award", "featured", "education"],
  stack: [
      "Firebase",
      "JavaScript",
      "HTML",
      "iSpeech",
    ],
  links: [
    {
      label: "devpost",
      href: "https://devpost.com/software/inklink-team-2",
      external: true,
    },
    {
      label: "github",
      href: "https://github.com/JLen5/overhaul",
      external: true,
    },
  ],
  role: "Builder",
  summary:
    "InkLink Team 2 won 1st place at Overhaul (Western Developer's Society) by extending the InkLink notes app with accounts, multiple note pages, and text-to-speech.",
  contributions: [
    "Added signup and multi-page notes on Firebase.",
    "Wired iSpeech so notes can be read back aloud.",
  ],
  outcomes: [
    "1st place at Overhaul — Western Developer's Society.",
  ],
};

export default inklink;
