import type { ProjectEntry } from "../types";

const init: ProjectEntry = {
  id: "init",
  name: "init",
  title: "One-click AI site builder at Hack the 6ix 2024",
  blurb:
    "Prompt a landing page, collaborate live, and deploy from the same session.",
  dates: "2024",
  section: "hackathons",
  hackathon: { event: "Hack the 6ix", year: 2024, notes: "Placement / awards TBD" },
  labels: [
      "hackathon",
      "tooling",
      "agents",
    ],
  stack: [
      "React",
      "Express",
      "FastAPI",
      "WebSockets",
      "GPT-4o",
    ],
  links: [
    {
      label: "devpost",
      href: "https://devpost.com/software/init-gaxp0c",
      external: true,
    },
    {
      label: "site",
      href: "https://hackthe6ix10.vercel.app/",
      external: true,
    },
  ],
  role: "Builder",
  summary:
    "init (Hack the 6ix 2024) generates a site from a prompt, shows a live preview, lets collaborators prompt together over websockets, and deploys in one click.",
  contributions: [
    "Split collaboration (Node/Express websocket) from generation (FastAPI + GPT-4o).",
    "Patched HTML/CSS from prompts into a shared live preview and deploy path.",
  ],
  outcomes: [
    "Working generate-collaborate-deploy demo at Hack the 6ix 2024.",
  ],
};

export default init;
