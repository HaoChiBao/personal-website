import type { ProjectEntry } from "../types";

const weve: ProjectEntry = {
  id: "weve",
  name: "weve",
  title: "2nd place at Hackville 2024",
  blurb:
    "Chrome extension for shared sticky notes and stickers drawn directly on any website.",
  dates: "2024",
  section: "hackathons",
  hackathon: { event: "Hackville", year: 2024, placement: "2nd place" },
  labels: ["hackathon", "award", "featured", "education", "extension"],
  stack: [
      "Chrome extension",
      "Firebase",
      "HTML",
      "CSS",
      "Figma",
    ],
  links: [
    {
      label: "devpost",
      href: "https://devpost.com/software/weve-weve-been-here-before",
      external: true,
    },
    {
      label: "github",
      href: "https://github.com/HaoChiBao/hackville24",
      external: true,
    },
  ],
  role: "Builder",
  summary:
    "weve placed 2nd at Hackville 2024. It is a Chrome extension for study groups: rooms of friends drop notes and stickers onto the live page, move them if they block content, and refresh to snap them back.",
  contributions: [
    "Built in-page notes and stickers that persist per room on any site.",
    "Synced rooms over Firebase so multiple people can write on the same page.",
  ],
  outcomes: [
    "2nd place at Hackville 2024.",
  ],
};

export default weve;
