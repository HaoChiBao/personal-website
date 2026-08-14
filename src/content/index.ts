/**
 * Content API — single import surface for profile, work, projects, awards,
 * education, and skills.
 *
 * Sections: work | opensource | projects | hackathons
 *
 * @example
 * import { listWork, listOpenSource, listPersonalProjects, listHackathonProjects } from "@/content";
 */

export { LABELS, getLabel, listLabels } from "./labels";
export type { LabelId, LabelKind } from "./labels";

export { SECTIONS, getSection } from "./sections";
export type { ProjectSection, SectionId } from "./sections";

export type {
  AwardEntry,
  CaseBlock,
  CaseStudy,
  ContentLink,
  EducationEntry,
  HackathonInfo,
  Profile,
  ProjectEntry,
  SkillGroup,
  WorkEntry,
} from "./types";

/** Path to a project case study page. */
export function caseHref(id: string): string {
  return `/case/${id}`;
}

export { profile, resumeContact } from "./profile";
export { work } from "./work";
export { awards } from "./awards";
export { education } from "./education";
export { skills } from "./skills";

export {
  projects,
  getProject,
  listProjects,
  listProjectIds,
  listProjectsByLabel,
  listOpenSource,
  listPersonalProjects,
  listHackathonProjects,
  listHackathonInfo,
} from "./projects";
export type { ListProjectsOptions } from "./projects";

import type { LabelId } from "./labels";
import { work } from "./work";
import { awards } from "./awards";
import type { WorkEntry } from "./types";

export function listWork(options: { labels?: LabelId[]; anyLabels?: LabelId[] } = {}): WorkEntry[] {
  const { labels, anyLabels } = options;
  return work.filter((w) => {
    if (labels?.length && !labels.every((l) => w.labels.includes(l))) return false;
    if (anyLabels?.length && !anyLabels.some((l) => w.labels.includes(l))) return false;
    return true;
  });
}

export function getWork(id: string): WorkEntry | undefined {
  return work.find((w) => w.id === id);
}

export function listAwards(options: { labels?: LabelId[]; anyLabels?: LabelId[] } = {}) {
  const { labels, anyLabels } = options;
  return awards.filter((a) => {
    if (labels?.length && !labels.every((l) => a.labels.includes(l))) return false;
    if (anyLabels?.length && !anyLabels.some((l) => a.labels.includes(l))) return false;
    return true;
  });
}
