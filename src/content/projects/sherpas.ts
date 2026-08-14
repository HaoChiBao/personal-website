import type { ProjectEntry } from "../types";

const sherpas: ProjectEntry = {
  id: "sherpas",
  name: "Sherpas",
  title: "Teacher, coach, and nanny personas at DeerHacks 2024",
  blurb:
    "Chrome extension trio: camera tutoring, hourly workouts, and emotion-aware check-ins.",
  dates: "2024",
  section: "hackathons",
  hackathon: { event: "DeerHacks", year: 2024, notes: "Placement / awards TBD" },
  labels: [
      "hackathon",
      "health",
      "education",
      "extension",
      "vision",
    ],
  stack: [
      "Chrome extension",
      "MediaPipe",
      "Flask",
      "Firebase",
      "Python",
    ],
  links: [
    {
      label: "devpost",
      href: "https://devpost.com/software/sherpas",
      external: true,
    },
    {
      label: "github",
      href: "https://github.com/nathan-nw/Deerhacks24",
      external: true,
    },
  ],
  role: "Builder",
  summary:
    "Sherpas (DeerHacks 2024) is a Chrome extension with three personas. Teacher reads notes off camera and explains them. Coach prompts hourly workouts and punishes junk-site visits with exercise. Nanny watches emotion and checks in.",
  contributions: [
    "Used MediaPipe for body and face so workouts and mood actually drive the personas.",
    "Built the Chrome shell that switches Teacher / Coach / Nanny in one extension.",
  ],
  outcomes: [
    "Submitted at DeerHacks 2024 as a three-persona wellness extension.",
  ],
};

export default sherpas;
