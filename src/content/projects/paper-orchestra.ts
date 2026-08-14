import type { ProjectEntry } from "../types";

const paper_orchestra: ProjectEntry = {
  id: "paper-orchestra",
  name: "PaperOrchestra",
  title: "3rd place at MetHacks 2023",
  blurb:
    "Video-call instruments you play with your hands via MediaPipe and Tone.js.",
  dates: "2023",
  section: "hackathons",
  hackathon: { event: "MetHacks", year: 2023, placement: "3rd place" },
  labels: ["hackathon", "award", "featured", "vision"],
  stack: [
      "MediaPipe",
      "Tone.js",
      "Agora",
      "React",
    ],
  links: [
    {
      label: "devpost",
      href: "https://devpost.com/software/paper-ochestra",
      external: true,
    },
    {
      label: "github",
      href: "https://github.com/HaoChiBao/methacks2023",
      external: true,
    },
  ],
  role: "Builder",
  summary:
    "PaperOrchestra placed 3rd at MetHacks 2023. In a video call, MediaPipe tracks your hands so you can play piano, drums, or maracas in the air while Tone.js sounds the notes.",
  contributions: [
    "Mapped MediaPipe hand landmarks to piano, snare, and maraca hits.",
    "Put the instruments inside an Agora video-call session so people can play together.",
  ],
  outcomes: [
    "3rd place at MetHacks 2023.",
  ],
};

export default paper_orchestra;
