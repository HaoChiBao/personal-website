import type { ProjectEntry } from "../types";

const aintern: ProjectEntry = {
  id: "aintern",
  name: "(A)Intern",
  title: "3D meeting intern at QHacks 2025",
  blurb:
    "Recall.ai meeting bot with a talking 3D avatar that answers live and takes notes.",
  dates: "2025",
  section: "hackathons",
  hackathon: { event: "QHacks", year: 2025, notes: "Placement / awards TBD" },
  labels: [
      "hackathon",
      "agents",
    ],
  stack: [
      "Recall.ai",
      "OpenAI",
      "ElevenLabs",
      "React",
      "Express",
      "Supabase",
      "WebSockets",
    ],
  links: [
    {
      label: "devpost",
      href: "https://devpost.com/software/aintern",
      external: true,
    },
    {
      label: "github",
      href: "https://github.com/owengretzinger/aintern",
      external: true,
    },
  ],
  role: "Builder",
  summary:
    "(A)Intern (QHacks 2025) is Iris, a 3D AI intern that joins Zoom, Meet, or Teams from a URL. It listens, answers out loud, takes notes, and can pull context from past meetings and uploaded docs.",
  contributions: [
    "Wired Recall.ai into the meeting so the bot can join from a URL and stay in the call.",
    "Drove a Ready Player Me / Mixamo avatar with ElevenLabs speech and Rhubarb lip sync.",
  ],
  outcomes: [
    "Live 3D meeting agent demo at QHacks 2025.",
  ],
};

export default aintern;
