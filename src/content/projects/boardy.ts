import type { ProjectEntry } from "../types";

const boardy: ProjectEntry = {
  id: "boardy",
  name: "Boardy",
  title: "Autonomous meeting agent for Zoom and Google Meet",
  blurb:
    "99% join success, sub-500ms voice responses, 50+ concurrent audio streams on Railway.",
  dates: "February 2025 – May 2025",
  section: "work",
  labels: ["contract", "agents", "shipped", "featured"],
  stack: [
    "Recall.ai",
    "Deepgram",
    "LiveKit",
    "Python",
    "Railway",
    "GraphQL",
  ],
  links: [{ label: "github", href: "https://github.com/HaoChiBao", external: true }],
  role: "Contract Software Engineer",
  summary:
    "At Boardy (an AI networking agent startup) I engineered an autonomous meeting agent that joins Zoom and Google Meet, listens, and responds in real time with high reliability and low latency.",
  contributions: [
    "Built the meeting agent on Recall.ai, Deepgram, and LiveKit with a 99% join success rate and sub-500ms voice response times.",
    "Cut inference costs 40% with layered models and context-aware prompt chaining for unstructured conversations.",
    "Deployed event-driven infrastructure on Railway with dynamic worker pools and custom autoscaling via Railway's GraphQL API.",
  ],
  outcomes: [
    "Supported 50+ concurrent audio streams without performance degradation.",
    "40% lower inference cost while keeping conversational quality.",
    "Production-grade join reliability across Zoom and Google Meet.",
  ],
  media: {
    video: "/media/boardy.mp4",
    mark: "/media/tag-boardy.png",
    caption: "Pulling an all-nighter at the Boardy offices",
  },
};

export default boardy;
