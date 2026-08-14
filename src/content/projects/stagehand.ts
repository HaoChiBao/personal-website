import type { ProjectEntry } from "../types";

const stagehand: ProjectEntry = {
  id: "stagehand",
  name: "Stagehand",
  title: "Docs fix merged into browserbase/stagehand (23,000+ stars)",
  blurb:
    "Merged contributor: removed stale docs claiming metrics() was unimplemented.",
  dates: "2026",
  section: "opensource",
  labels: ["opensource", "shipped", "tooling", "featured"],
  stack: ["TypeScript", "Python"],
  links: [
    {
      label: "repo",
      href: "https://github.com/browserbase/stagehand",
      external: true,
    },
    {
      label: "#2694",
      href: "https://github.com/browserbase/stagehand/pull/2694",
      external: true,
    },
  ],
  role: "Merged contributor",
  summary:
    "Stagehand is Browserbase's SDK for browser agents (23,000+ stars). I removed outdated observability docs that still said metrics() threw \"Method not implemented,\" after the TypeScript and Python SDKs already shipped it.",
  contributions: [
    "Deleted stale not-implemented TODOs in the observability docs (#2694).",
  ],
  outcomes: [
    "Docs fix merged upstream into browserbase/stagehand.",
    "Listed as a contributor on the default branch.",
  ],
};

export default stagehand;
