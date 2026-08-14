import type { ProjectEntry } from "../types";

const rbc: ProjectEntry = {
  id: "rbc",
  name: "RBC Amplify — Liquidity Forecasting",
  title: "Award-winning liquidity forecasting platform for Commercial Banking",
  blurb:
    "$20K Industry Disruptor Prize · adopted to oversee $10B+ in annual transactions.",
  dates: "May 2025 – August 2025",
  section: "work",
  labels: ["internship", "enterprise", "award", "featured"],
  stack: [
    "React.js",
    "Python",
    "FastAPI",
    "WebSockets",
    "OpenShift",
    "Kubernetes",
    "AI agents",
  ],
  links: [],
  role: "Software Developer Intern",
  summary:
    "At RBC Amplify I built a liquidity forecasting platform with a scalable full-stack architecture. Commercial Banking adopted it to oversee $10B+ in annual transactions, and the project won a $20K Industry Disruptor Prize.",
  contributions: [
    "Multi-user synchronization engine on Python FastAPI WebSockets, adapting algorithms from Figma's published research for collaborative financial modeling.",
    "Interactive infinite canvas in React.js with tree-based data structures for drag-and-drop cash-flow mapping.",
    "Three specialized AI agent microservices (Analyzer, Architect, Recommender) that cut manual client-structuring time by 92%.",
    "CI/CD and hosting on OpenShift (Kubernetes) for high-availability WebSocket sessions in a secure banking environment.",
  ],
  outcomes: [
    "Won $20K Industry Disruptor Prize.",
    "Adopted by Commercial Banking for $10B+ annual transaction oversight.",
    "92% reduction in manual structuring time via AI agent onboarding.",
  ],
  media: {
    image: "/media/rbc-logo.jpg",
    caption: "RBC Amplify internship",
  },
};

export default rbc;
