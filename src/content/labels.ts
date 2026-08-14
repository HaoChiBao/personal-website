/**
 * Canonical labels for filtering / grouping content.
 * Prefer these over free-form strings when querying.
 */
export const LABELS = {
  contract: { id: "contract", name: "Contract", kind: "engagement" },
  internship: { id: "internship", name: "Internship", kind: "engagement" },
  indie: { id: "indie", name: "Indie", kind: "engagement" },
  hackathon: { id: "hackathon", name: "Hackathon", kind: "engagement" },
  opensource: { id: "opensource", name: "Open source", kind: "engagement" },
  shipped: { id: "shipped", name: "Shipped", kind: "status" },
  award: { id: "award", name: "Award", kind: "status" },
  featured: { id: "featured", name: "Featured", kind: "status" },
  agents: { id: "agents", name: "Agents", kind: "topic" },
  tooling: { id: "tooling", name: "Tooling", kind: "topic" },
  enterprise: { id: "enterprise", name: "Enterprise", kind: "topic" },
  hardware: { id: "hardware", name: "Hardware", kind: "topic" },
  health: { id: "health", name: "Health", kind: "topic" },
  vision: { id: "vision", name: "Computer vision", kind: "topic" },
  education: { id: "education", name: "Education", kind: "topic" },
  fintech: { id: "fintech", name: "Fintech", kind: "topic" },
  extension: { id: "extension", name: "Browser extension", kind: "topic" },
} as const;

export type LabelId = keyof typeof LABELS;
export type LabelKind = (typeof LABELS)[LabelId]["kind"];

export function getLabel(id: LabelId) {
  return LABELS[id];
}

export function listLabels(kind?: LabelKind) {
  const all = Object.values(LABELS);
  return kind ? all.filter((l) => l.kind === kind) : all;
}
