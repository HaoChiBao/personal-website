import type { ProjectEntry } from "../types";

const costmcp: ProjectEntry = {
  id: "costmcp",
  name: "CostMCP",
  title: "AI-native cost ledger for builders",
  blurb:
    "Track tokens, generations, subscriptions, and project spend via REST, SDK, or MCP.",
  dates: "2026",
  section: "projects",
  labels: ["indie", "tooling", "shipped", "featured", "agents"],
  stack: [
    "TypeScript",
    "Next.js",
    "Supabase",
    "MCP",
    "pnpm",
    "Turborepo",
    "Mintlify",
  ],
  links: [
    {
      label: "github",
      href: "https://github.com/HaoChiBao/costmcp",
      external: true,
    },
    {
      label: "mcp",
      href: "https://mcp.costmcp.com",
      external: true,
    },
  ],
  role: "Solo builder",
  summary:
    "CostMCP is an AI-native cost ledger: ingest usage and expenses, roll up monthly and per-project spend, and expose the same ledger to agents over MCP. Monorepo with a Next.js API, core CostMessage types, Supabase (RLS + budgets), and a stdio/HTTP MCP server with tools for usage, subscriptions, obligations, projects, and budget status.",
  contributions: [
    "Defined CostMessage ingest and Phase 0 REST (health, messages, monthly summary, project spend, budgets).",
    "Shipped MCP tools (log_usage, expenses, subscriptions, obligations, projects, estimate_cost, budget/summary reads) at mcp.costmcp.com.",
    "Supabase schema with RLS, global budget, and Mintlify API/MCP/OAuth docs.",
  ],
  outcomes: [
    "Live MCP endpoint for agents plus local stdio/HTTP modes.",
    "Product + architecture specs and ChatGPT app submission assets in-repo.",
  ],
};

export default costmcp;
