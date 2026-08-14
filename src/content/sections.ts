/**
 * Top-level content sections for the site / resume.
 * Projects carry a `section` field; work lives in `work.ts`.
 */
export const SECTIONS = {
  work: {
    id: "work",
    title: "Work",
    description: "Internships and contracts",
  },
  opensource: {
    id: "opensource",
    title: "Open source",
    description: "Merged contributions and public repos",
  },
  projects: {
    id: "projects",
    title: "Projects",
    description: "Products and tools I built",
  },
  hackathons: {
    id: "hackathons",
    title: "Hackathons",
    description: "Competition builds and placements",
  },
} as const;

/** Which section a project entry belongs to. */
export type ProjectSection = "opensource" | "projects" | "hackathons" | "work";

export type SectionId = keyof typeof SECTIONS;

export function getSection(id: SectionId) {
  return SECTIONS[id];
}
