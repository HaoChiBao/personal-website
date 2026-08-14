import type { WorkEntry } from "./types";

/**
 * Employment / engagement timeline (newest first). Sourced from resume.
 */
export const work: WorkEntry[] = [
  {
    id: "rbc",
    org: "RBC Amplify",
    role: "Software Developer Intern",
    dates: "May 2025 – August 2025",
    location: "Toronto, ON",
    href: "https://www.rbcroyalbank.com/",
    labels: ["internship", "enterprise"],
    summary:
      "Award-winning liquidity forecasting platform adopted by Commercial Banking for $10B+ in annual transactions.",
    bullets: [
      "Created an award-winning liquidity forecasting platform using a scalable full-stack architecture, winning a $20K Industry Disruptor Prize and adoption by Commercial Banking to oversee $10B+ in annual transactions.",
      "Built a multi-user synchronization engine on Python FastAPI WebSockets, adapting algorithms from Figma's published research to keep state consistent across simultaneous editors during collaborative financial modeling.",
      "Designed an interactive infinite canvas interface in React.js backed by tree-based data structures, giving users a visual node graph to map complex cash flows.",
      "Split client onboarding across three specialized AI agents (Analyzer, Architect, Recommender) running as Python microservices, cutting manual structuring time by 92%.",
      "Stood up a CI/CD and hosting pipeline on OpenShift (Kubernetes) with internal banking tooling, sustaining high availability for persistent WebSocket connections in a secure enterprise environment.",
    ],
    projectIds: ["rbc"],
  },
  {
    id: "boardy",
    org: "Boardy",
    role: "Contract Software Engineer",
    dates: "February 2025 – May 2025",
    location: "Remote",
    href: null,
    labels: ["contract", "agents"],
    summary:
      "Autonomous meeting agent for Zoom and Google Meet with sub-500ms voice responses and Railway-scaled audio workers.",
    bullets: [
      "Engineered an autonomous meeting agent on Recall.ai, Deepgram, and LiveKit, reaching a 99% join success rate and sub-500ms voice response times across Zoom and Google Meet.",
      "Cut inference costs 40% by layering models of different sizes behind context-aware prompt chaining while keeping the agent able to navigate unstructured conversations.",
      "Deployed event-driven infrastructure on Railway with dynamic worker pools and custom automatic scaling through Railway's GraphQL API, supporting 50+ concurrent audio streams without performance degradation.",
    ],
    projectIds: ["boardy"],
  },
];
