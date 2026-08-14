import type { ProjectEntry } from "../types";

const cloudflareDocs: ProjectEntry = {
  id: "cloudflare-docs",
  name: "Cloudflare Docs",
  title: "Three docs PRs merged into cloudflare/cloudflare-docs",
  blurb:
    "Merged contributor: waitUntil background-work warning, Workflows sleep units, and a leftover PAC TODO.",
  dates: "2026",
  section: "opensource",
  labels: ["opensource", "shipped", "featured"],
  stack: ["Markdown"],
  links: [
    {
      label: "repo",
      href: "https://github.com/cloudflare/cloudflare-docs",
      external: true,
    },
    {
      label: "#32626",
      href: "https://github.com/cloudflare/cloudflare-docs/pull/32626",
      external: true,
    },
    {
      label: "#32624",
      href: "https://github.com/cloudflare/cloudflare-docs/pull/32624",
      external: true,
    },
    {
      label: "#32622",
      href: "https://github.com/cloudflare/cloudflare-docs/pull/32622",
      external: true,
    },
  ],
  role: "Merged contributor",
  summary:
    "Cloudflare’s public product docs. I landed three merged PRs that fix incorrect or unfinished guidance in Workers, Workflows, and Cloudflare One.",
  contributions: [
    "Warned that fire-and-forget async in Workers dies unless awaited or registered with waitUntil (#32626).",
    "Documented that Workflows step.sleep numeric duration is milliseconds, not seconds (#32624).",
    "Removed an unpublished PAC Firefox TODO that had shipped as literal placeholder text (#32622).",
  ],
  outcomes: [
    "Three docs PRs merged upstream into cloudflare/cloudflare-docs.",
  ],
};

export default cloudflareDocs;
