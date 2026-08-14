import type { AwardEntry } from "./types";

/**
 * Awards and recognition from resume (plus shipped milestones).
 */
export const awards: AwardEntry[] = [
  {
    id: "rbc-industry-disruptor",
    title: "RBC Amplify — $20K Industry Disruptor Prize",
    detail:
      "Liquidity forecasting platform adopted by Commercial Banking ($10B+ annual transactions)",
    labels: ["award", "internship", "enterprise"],
    projectId: "rbc",
  },
  {
    id: "uofthacks-1st",
    title: "UofTHacks 11 — 1st overall",
    detail: "FurMe · 600+ hackers, University of Toronto",
    labels: ["award", "hackathon", "hardware"],
    projectId: "furme",
  },
  {
    id: "hackharvard",
    title: "HackHarvard 2025 — Visa Truth & Trust track",
    detail: "Visa Verify · first-place track finish",
    labels: ["award", "hackathon", "fintech"],
    projectId: "visa-verify",
  },
  {
    id: "nexhacks",
    title: "NexHacks (Carnegie Mellon) — Best UI/UX",
    detail: "PrismLines · add-on track",
    labels: ["award", "hackathon", "fintech"],
    projectId: "prismlines",
  },
  {
    id: "hack-western-2nd",
    title: "Hack Western 10 — 2nd place",
    detail: "Infu · also Best Use of Google Cloud",
    labels: ["award", "hackathon", "hardware"],
    projectId: "infu",
  },
  {
    id: "qhacks-2nd",
    title: "QHacks 2024 — 2nd place",
    detail: "Dr. DoDo · also Best Use of AI in Education",
    labels: ["award", "hackathon", "education"],
    projectId: "doctor-dodo",
  },
  {
    id: "hackville-2nd",
    title: "Hackville 2024 — 2nd place",
    detail: "weve",
    labels: ["award", "hackathon", "education"],
    projectId: "weve",
  },
  {
    id: "overhaul-1st",
    title: "Overhaul (Western Developer's Society) — 1st place",
    detail: "InkLink",
    labels: ["award", "hackathon", "education"],
    projectId: "inklink",
  },
  {
    id: "dataquest-1st",
    title: "DataQuest — 1st place",
    detail: "Hotel booking cancellation model",
    labels: ["award", "hackathon"],
    projectId: "booking-cancellations",
  },
  {
    id: "methacks-3rd",
    title: "MetHacks 2023 — 3rd place",
    detail: "PaperOrchestra",
    labels: ["award", "hackathon", "vision"],
    projectId: "paper-orchestra",
  },
  {
    id: "maplehacks-health",
    title: "MapleHacks — Best Good Health & Wellbeing Hack",
    detail: "MedNow",
    labels: ["award", "hackathon", "health"],
    projectId: "mednow",
  },
  {
    id: "deltahacks-education",
    title: "DeltaHacks X — Best Education Hack",
    detail: "coTA",
    labels: ["award", "hackathon", "education"],
    projectId: "cota",
  },
  {
    id: "hackathon-record",
    title: "12 first-place and 5 top-3 finishes across 20+ hackathons",
    labels: ["award", "hackathon"],
  },
  {
    id: "nodes-shipped",
    title: "Nodes — 1,000+ Chrome installs",
    detail: "17,000+ LinkedIn profiles indexed",
    labels: ["shipped", "indie", "tooling"],
    projectId: "nodes",
  },
];
