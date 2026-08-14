import type { ProjectEntry } from "../types";

const openworker: ProjectEntry = {
  id: "openworker",
  name: "OpenWorker",
  title: "Security fix merged into andrewyng/openworker (14,000+ stars)",
  blurb:
    "Merged contributor: blocked untrusted project config from silently launching processes on open.",
  dates: "2026",
  section: "opensource",
  labels: ["opensource", "shipped", "tooling", "featured"],
  stack: ["Python", "MCP"],
  links: [
    {
      label: "repo",
      href: "https://github.com/andrewyng/openworker",
      external: true,
    },
    {
      label: "#215",
      href: "https://github.com/andrewyng/openworker/pull/215",
      external: true,
    },
  ],
  role: "Merged contributor",
  summary:
    "OpenWorker is an open-source AI agent project (14,000+ stars). I fixed a remote code execution flaw where cloning any repository let its configuration file silently launch processes on the user's machine as soon as the project was opened.",
  contributions: [
    "Gated dangerous configuration behind the project's existing trust check, blocked by default across all three load paths.",
    "Added regression tests proving untrusted projects cannot launch processes or override trusted server names.",
    "Maintainer verified the fix against the original proof-of-concept.",
  ],
  outcomes: [
    "Security fix merged upstream into andrewyng/openworker.",
    "Untrusted projects can no longer auto-launch processes on open.",
  ],
};

export default openworker;
