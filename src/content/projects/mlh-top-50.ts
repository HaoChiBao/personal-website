import type { ProjectEntry } from "../types";

const mlhTop50: ProjectEntry = {
  id: "mlh-top-50",
  name: "MLH Top 50",
  title: "MLH Top 50",
  blurb:
    "Named to Major League Hacking's annual list of 50 student hackers.",
  dates: "2026",
  section: "projects",
  labels: ["award", "hackathon"],
  stack: [],
  links: [
    {
      label: "MLH Top 50",
      href: "https://top.mlh.io/",
      external: true,
    },
  ],
  role: "Honoree",
  summary:
    "Major League Hacking named me to the Top 50 — their annual list of 50 student hackers. They pick people who shipped work, led in the community, and can tell that story clearly.",
  contributions: [
    "20+ hackathons with 12 first-place and 5 top-3 finishes.",
    "Shipped tools people actually use — Nodes, open-source agent work, and weekend builds that won.",
  ],
  outcomes: [
    "Selected for the MLH Top 50.",
  ],
  caseStudy: {
    headline: "MLH Top 50",
    blocks: [
      {
        type: "paragraph",
        text: "Major League Hacking named me to the Top 50. Each year they pick 50 student hackers — not for one weekend, but for the work and the community around it.",
      },
      {
        type: "paragraph",
        text: "The list is small on purpose. You apply, MLH reads the story, and they choose people who built things, helped other hackers, and can say why that mattered.",
      },
      {
        type: "heading",
        text: "What I brought",
      },
      {
        type: "paragraph",
        text: "I treat hackathons like shipping practice. Twenty-plus events. Twelve firsts, five more top-threes. FurMe won UofTHacks overall. Visa Verify won a HackHarvard track. RBC Amplify took the Industry Disruptor prize and landed in Commercial Banking.",
      },
      {
        type: "paragraph",
        text: "Same habit outside the weekend: Nodes indexes LinkedIn at scale, and the open-source agent work is meant to get used, not just demoed.",
      },
      {
        type: "heading",
        text: "The list",
      },
      {
        type: "paragraph",
        text: "Official write-up lives on MLH's Top 50 site. This page is the short version from my side.",
      },
    ],
  },
};

export default mlhTop50;
