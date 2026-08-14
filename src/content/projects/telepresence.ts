import type { ProjectEntry } from "../types";

const telepresence: ProjectEntry = {
  id: "telepresence",
  name: "TelePresence",
  title: "Anonymous cube therapy rooms at QHacks 2023",
  blurb:
    "Three.js rooms where people are cubes — roll up, chat, skip the camera-on anxiety.",
  dates: "2023",
  section: "hackathons",
  hackathon: { event: "QHacks", year: 2023, notes: "Placement / awards TBD" },
  labels: [
      "hackathon",
      "health",
    ],
  stack: [
      "Three.js",
      "React",
      "Firebase",
      "OpenAI",
    ],
  links: [
    {
      label: "devpost",
      href: "https://devpost.com/software/telepresence-av7ikn",
      external: true,
    },
    {
      label: "github",
      href: "https://github.com/HaoChiBao/qhacks",
      external: true,
    },
  ],
  role: "Builder",
  summary:
    "TelePresence (QHacks 2023) is a VR-ish therapy/class space in the browser. Everyone is a cube. You roll around a shared room and chat in text so identity stays off-camera and the room still feels occupied.",
  contributions: [
    "Built the Three.js room and cube movement so presence does not require a webcam.",
    "Added named text chat on Firebase for the session.",
  ],
  outcomes: [
    "Submitted at QHacks 2023 as an anonymous shared-room prototype.",
  ],
};

export default telepresence;
