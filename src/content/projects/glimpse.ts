import type { ProjectEntry } from "../types";

const glimpse: ProjectEntry = {
  id: "glimpse",
  name: "Glimpse",
  title: "Emotion timeline at DeltaHacks XI",
  blurb:
    "DeepFace watches mood shifts, snapshots the screen, and builds a polaroid day-in-feelings log.",
  dates: "2025",
  section: "hackathons",
  hackathon: { event: "DeltaHacks XI", year: 2025, notes: "Placement / awards TBD" },
  labels: [
      "hackathon",
      "vision",
      "health",
    ],
  stack: [
      "React",
      "Firebase",
      "Python",
      "DeepFace",
    ],
  links: [
    {
      label: "devpost",
      href: "https://devpost.com/software/glimpse-b05cd9",
      external: true,
    },
    {
      label: "github",
      href: "https://github.com/HaoChiBao/deltahacks11",
      external: true,
    },
  ],
  role: "Builder",
  summary:
    "Glimpse (DeltaHacks XI) tracks facial emotion through the day. When mood shifts hard, it snapshots your face and screen into a color timeline of polaroids, then prompts a short reflection at night.",
  contributions: [
    "Detected emotion deltas with DeepFace and triggered screen + face captures.",
    "Built the color timeline and end-of-day reflection flow in React and Firebase.",
  ],
  outcomes: [
    "Submitted at DeltaHacks XI as a working emotion journal.",
  ],
};

export default glimpse;
