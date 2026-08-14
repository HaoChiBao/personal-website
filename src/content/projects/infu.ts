import type { ProjectEntry } from "../types";

const infu: ProjectEntry = {
  id: "infu",
  name: "Infu",
  title: "2nd place at Hack Western 10",
  blurb:
    "Wearable that transcribes conversations, IDs faces, and writes a memory you can actually recall.",
  dates: "2023",
  section: "hackathons",
  hackathon: { event: "Hack Western 10", year: 2023, placement: "2nd place", notes: "Also Best Use of Google Cloud" },
  labels: [
      "hackathon",
      "award",
      "featured",
      "hardware",
      "vision",
    ],
  stack: [
      "Python",
      "OpenAI",
      "Firebase",
      "React",
      "ESP32",
      "Face recognition",
    ],
  links: [
    {
      label: "devpost",
      href: "https://devpost.com/software/infu",
      external: true,
    },
    {
      label: "github",
      href: "https://github.com/rachelchxn/hackwestern23",
      external: true,
    },
  ],
  role: "Builder",
  summary:
    "Infu (I'll never forget u) took 2nd overall, Finalist, and Best Use of Google Cloud at Hack Western 10. A camera and mic on the user transcribe conversations, facial recognition files the person, and an ESP32 wrist display plus a web app surface the AI summary later.",
  contributions: [
    "Built the face + speech pipeline that turns a conversation into a named memory.",
    "Shipped the ESP32 OLED wearable with touch wires as record controls.",
  ],
  outcomes: [
    "Second Place Overall at Hack Western 10.",
    "Best Use of Google Cloud at Hack Western 10.",
  ],
};

export default infu;
