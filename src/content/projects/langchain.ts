import type { ProjectEntry } from "../types";

const langchain: ProjectEntry = {
  id: "langchain",
  name: "LangChain",
  title: "Core tracing fix merged into langchain-ai/langchain (144,000+ stars)",
  blurb:
    "Merged contributor: cancelled chain-group traces now error instead of staying pending.",
  dates: "2026",
  section: "opensource",
  labels: ["opensource", "shipped", "agents", "featured"],
  stack: ["Python"],
  links: [
    {
      label: "repo",
      href: "https://github.com/langchain-ai/langchain",
      external: true,
    },
    {
      label: "#39699",
      href: "https://github.com/langchain-ai/langchain/pull/39699",
      external: true,
    },
  ],
  role: "Merged contributor",
  summary:
    "LangChain is an agent engineering platform (144,000+ stars). I fixed chain-group tracing so asyncio cancellation and other BaseException interrupts still call on_chain_error instead of leaving the LangSmith run pending.",
  contributions: [
    "Caught BaseException in trace_as_chain_group and atrace_as_chain_group, matching other core usage.",
    "Still invoke on_chain_error, then re-raise so cancellation is not swallowed.",
    "Added unit tests covering cancelled chain-group traces.",
  ],
  outcomes: [
    "Core tracing fix merged upstream into langchain-ai/langchain.",
    "Cancelled or interrupted chain groups now mark the run as errored instead of pending.",
  ],
};

export default langchain;
