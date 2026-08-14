import type { ProjectEntry } from "../types";

const mostRealisticGame: ProjectEntry = {
  id: "most-realistic-game",
  name: "The Most Realistic Game",
  title: "LLM terminal adventure with a world that keeps moving",
  blurb:
    "CRT-style text adventure: new worlds each run, autonomous NPCs, server-owned STATE, shareable seeds.",
  dates: "2026",
  section: "projects",
  labels: ["indie", "agents", "shipped", "featured"],
  stack: [
    "Next.js",
    "React",
    "TypeScript",
    "NVIDIA NIM",
    "DeepSeek",
    "OpenAI API",
    "Supabase",
    "Vercel",
  ],
  links: [
    {
      label: "site",
      href: "https://the-most-realistic-game.vercel.app",
      external: true,
    },
    {
      label: "github",
      href: "https://github.com/HaoChiBao/the-most-realistic-game",
      external: true,
    },
  ],
  role: "Solo builder",
  summary:
    "A minimalist terminal text-adventure where every session boots a new world with hidden tension, rules, and autonomous characters. The world keeps moving whether you act or not. Narration streams from DeepSeek (NVIDIA NIM) or OpenAI into a CRT UI; API keys stay on the server. Runtime owns a WorldBible and validated STATE so fairness-critical truth is not left to freeform LLM prose. Share links hydrate seeds from Supabase with engine-version gates.",
  contributions: [
    "Built streaming game API, CRT terminal UI, and 140-character input caps client and server.",
    "Hardened fairness: restraint/lethal consequence fixes, combat outcome resolver, progressive NPC knowledge, relationship logs, player-facing timeline.",
    "Share-world seeds via Supabase SECURITY DEFINER RPCs; CI typecheck + unit suite for parse, STATE, combat, and seed dials.",
  ],
  outcomes: [
    "Live at the-most-realistic-game.vercel.app.",
    "Engineering roadmap shipping Phase 0/1 consistency and WorldBible ownership.",
  ],
};

export default mostRealisticGame;
