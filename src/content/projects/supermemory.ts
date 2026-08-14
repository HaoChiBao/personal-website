import type { ProjectEntry } from "../types";

const supermemory: ProjectEntry = {
  id: "supermemory",
  name: "Supermemory",
  title: "Extension fix merged into supermemoryai/supermemory (28,000+ stars)",
  blurb:
    "Merged contributor: finished leftover Included Memories UI on the T3 extension surface.",
  dates: "2026",
  section: "opensource",
  labels: ["opensource", "shipped", "tooling", "featured"],
  stack: ["TypeScript", "Browser extension"],
  links: [
    {
      label: "repo",
      href: "https://github.com/supermemoryai/supermemory",
      external: true,
    },
    {
      label: "#1421",
      href: "https://github.com/supermemoryai/supermemory/pull/1421",
      external: true,
    },
  ],
  role: "Merged contributor",
  summary:
    "Supermemory is an open-source memory engine (28,000+ stars). I finished leftover Included Memories work on the T3 extension surface so recalled items no longer stall in a half-applied state.",
  contributions: [
    "Closed leftover Included Memories handling on the T3 extension path (#1421).",
    "Landed as a listed contributor after the fix merged to default.",
  ],
  outcomes: [
    "Extension fix merged upstream into supermemoryai/supermemory.",
  ],
};

export default supermemory;
