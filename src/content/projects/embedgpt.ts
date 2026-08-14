import type { ProjectEntry } from "../types";

const embedgpt: ProjectEntry = {
  id: "embedgpt",
  name: "EmbedGPT",
  title: "ChatGPT inside the browsing experience",
  blurb:
    "Chrome extension: highlight-to-ask, in-page chat, popup history, and image queries without leaving the tab.",
  dates: "2024 – 2025",
  section: "projects",
  labels: ["indie", "extension", "shipped", "featured"],
  stack: [
    "JavaScript",
    "Chrome extension",
    "Firebase",
    "OpenAI",
    "CSS",
    "HTML",
  ],
  links: [
    {
      label: "github",
      href: "https://github.com/HaoChiBao/EmbedGPT",
      external: true,
    },
    {
      label: "privacy",
      href: "https://wadoyuse-privacy-policy.vercel.app",
      external: true,
    },
  ],
  role: "Solo builder",
  summary:
    "EmbedGPT integrates ChatGPT into browsing so you stay on the page. Highlight content (including images) to query, use a popup for normal chat/image asks, share history between popup and in-page panels, and prepare for freemium (daily image caps vs GPT-4 unlimited). Worklog covers chat data-structure rewrite, Firebase auth, settings, markdown/LaTeX plans, and Chrome Web Store launch prep (Sept 2024).",
  contributions: [
    "Content + popup chat with shared history, highlight-to-open minimized panel, and popout between surfaces.",
    "Auth and settings scaffolding (Firebase client; server-side key/query path planned).",
    "Privacy policy site for store submission; markdown response formatting support.",
  ],
  outcomes: [
    "Extension + privacy policy live for Web Store readiness.",
    "Feature set inspired by ChatGPT-for-Google, Grammarly, and Glasp-style highlight flows.",
  ],
};

export default embedgpt;
