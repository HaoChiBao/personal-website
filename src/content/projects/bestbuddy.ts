import type { ProjectEntry } from "../types";

const bestbuddy: ProjectEntry = {
  id: "bestbuddy",
  name: "BestBuddy (Mochi Pet)",
  title: "Interactive mochi desktop pet Chrome extension",
  blurb:
    "Pick up, throw, and customize a Japanese mochi pet that sticks to the page and watches videos with you.",
  dates: "2022 – 2023",
  section: "projects",
  labels: ["indie", "extension", "shipped", "featured"],
  stack: ["JavaScript", "Chrome extension (MV3)", "CSS", "HTML"],
  links: [
    {
      label: "github",
      href: "https://github.com/HaoChiBao/bestBuddy",
      external: true,
    },
  ],
  role: "Solo builder",
  summary:
    "Desktop Mochi Pet (Chrome Web Store name: mochi pet / Best Browser Buddy) is an early interactive pet extension. Content scripts inject a physics-driven mochi you can pick up, throw, and drop so it sticks on screen. When a video plays it sits and watches with you. Popup settings cover size, color, and sound. Manifest v3 with storage, alarms, and notifications; version 0.9.8 in-repo.",
  contributions: [
    "Built buddy/physics/entity content scripts for drag, throw, bounce, and stick behavior.",
    "Video-watching companion mode and popup customization (size, color, SFX).",
    "MV3 packaging with web-accessible images and popup menu.",
  ],
  outcomes: [
    "Shipped as a playful Chrome extension (store-oriented README install flow).",
    "Early portfolio piece that led into later pet/agent experiments (e.g. Dr. DoDo, desktop-agent).",
  ],
};

export default bestbuddy;
