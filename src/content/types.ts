import type { LabelId } from "./labels";
import type { ProjectSection } from "./sections";

export type { ProjectSection, SectionId } from "./sections";

export type ContentLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type Profile = {
  name: string;
  headline: string;
  bio: string;
  location: string;
  email: string;
  phone?: string;
  website?: string;
  links: ContentLink[];
};

export type EducationEntry = {
  id: string;
  school: string;
  degree: string;
  location: string;
  dates: string;
  coursework?: string[];
};

export type SkillGroup = {
  id: string;
  category: string;
  items: string[];
};

export type WorkEntry = {
  id: string;
  org: string;
  role: string;
  /** Display range, e.g. "2025" or "May 2025 – August 2025" */
  dates: string;
  location?: string;
  href?: string | null;
  labels: LabelId[];
  summary?: string;
  /** Resume-style bullet points */
  bullets?: string[];
  /** Related project ids */
  projectIds?: string[];
};

/** Structured hackathon metadata (fill gaps later as needed). */
export type HackathonInfo = {
  /** Event name, e.g. "SpurHacks", "DeltaHacks 12" */
  event: string;
  /** Calendar year of the event */
  year: number;
  /** Placement or award if any, e.g. "1st overall", "Best UI/UX" */
  placement?: string;
  /** Named track if any */
  track?: string;
  /** Freeform notes / gaps to fill later */
  notes?: string;
};

/** Blog-style blocks for a case study page. */
export type CaseBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "image"; src: string; alt: string; caption?: string }
  | { type: "video"; src: string; caption?: string }
  | { type: "quote"; text: string; attribution?: string }
  | { type: "list"; items: string[] };

export type CaseStudy = {
  /** Optional longer title override */
  headline?: string;
  /** Hero image/video under the title */
  hero?: { image?: string; video?: string; caption?: string };
  blocks: CaseBlock[];
};

export type ProjectEntry = {
  id: string;
  name: string;
  /** Short card / list title */
  title: string;
  /** One-line blurb for indexes */
  blurb: string;
  dates: string;
  /**
   * Site section bucket:
   * opensource | projects | hackathons | work (case study linked from a job)
   */
  section: ProjectSection;
  /** Required when section is "hackathons"; optional elsewhere */
  hackathon?: HackathonInfo;
  labels: LabelId[];
  stack: string[];
  links: ContentLink[];
  /** Longer overview for detail pages */
  summary: string;
  role: string;
  story?: string;
  contributions?: string[];
  outcomes?: string[];
  /** Optional media keys under /public later */
  media?: {
    video?: string;
    image?: string;
    /** Small brand/tag mark shown next to the case title */
    mark?: string;
    caption?: string;
  };
  /** Optional structured case study; page falls back to summary/story/etc. */
  caseStudy?: CaseStudy;
};

export type AwardEntry = {
  id: string;
  title: string;
  detail?: string;
  labels: LabelId[];
  projectId?: string;
};
