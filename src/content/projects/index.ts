import type { LabelId } from "../labels";
import type { ProjectSection } from "../sections";
import type { ProjectEntry } from "../types";
import aintern from "./aintern";
import bestbuddy from "./bestbuddy";
import boardy from "./boardy";
import bookingCancellations from "./booking-cancellations";
import brief from "./brief";
import cloudflareDocs from "./cloudflare-docs";
import costmcp from "./costmcp";
import cota from "./cota";
import crowdWatch from "./crowd-watch";
import doctorDodo from "./doctor-dodo";
import embedgpt from "./embedgpt";
import eyeexplore from "./eyeexplore";
import furme from "./furme";
import glimpse from "./glimpse";
import infu from "./infu";
import initProject from "./init";
import inklink from "./inklink";
import insight from "./insight";
import interviewRoyale from "./interview-royale";
import langchain from "./langchain";
import mednow from "./mednow";
import mostRealisticGame from "./most-realistic-game";
import neolume from "./neolume";
import nodes from "./nodes";
import openworker from "./openworker";
import paperOrchestra from "./paper-orchestra";
import prismlines from "./prismlines";
import rbc from "./rbc";
import sherpas from "./sherpas";
import stagehand from "./stagehand";
import supermemory from "./supermemory";
import swipify from "./swipify";
import telepresence from "./telepresence";
import tickex from "./tickex";
import visaVerify from "./visa-verify";
import volleyballAi from "./volleyball-ai";
import weve from "./weve";
import youtubeUploader from "./youtube-uploader";

/** All project-like entries (OSS, products, hackathons, work case studies). */
export const projects: ProjectEntry[] = [
  langchain,
  openworker,
  supermemory,
  stagehand,
  cloudflareDocs,
  costmcp,
  mostRealisticGame,
  youtubeUploader,
  volleyballAi,
  nodes,
  embedgpt,
  bestbuddy,
  rbc,
  boardy,
  interviewRoyale,
  brief,
  prismlines,
  visaVerify,
  insight,
  crowdWatch,
  aintern,
  swipify,
  neolume,
  glimpse,
  furme,
  weve,
  doctorDodo,
  initProject,
  sherpas,
  cota,
  infu,
  inklink,
  tickex,
  paperOrchestra,
  mednow,
  bookingCancellations,
  telepresence,
  eyeexplore,
];

const byId = new Map(projects.map((p) => [p.id, p]));

export type ListProjectsOptions = {
  /** Keep projects that have ALL of these labels */
  labels?: LabelId[];
  /** Keep projects that have ANY of these labels */
  anyLabels?: LabelId[];
  /** Only featured */
  featured?: boolean;
  /** Site section bucket */
  section?: ProjectSection;
};

export function listProjects(options: ListProjectsOptions = {}): ProjectEntry[] {
  const { labels, anyLabels, featured, section } = options;

  return projects.filter((p) => {
    if (section && p.section !== section) return false;
    if (featured && !p.labels.includes("featured")) return false;
    if (labels?.length && !labels.every((l) => p.labels.includes(l))) return false;
    if (anyLabels?.length && !anyLabels.some((l) => p.labels.includes(l))) return false;
    return true;
  });
}

export function getProject(id: string): ProjectEntry | undefined {
  return byId.get(id);
}

export function listProjectIds(): string[] {
  return projects.map((p) => p.id);
}

export function listProjectsByLabel(label: LabelId): ProjectEntry[] {
  return listProjects({ anyLabels: [label] });
}

export function listOpenSource(options: Omit<ListProjectsOptions, "section"> = {}) {
  return listProjects({ ...options, section: "opensource" });
}

export function listPersonalProjects(
  options: Omit<ListProjectsOptions, "section"> = {},
) {
  return listProjects({ ...options, section: "projects" });
}

function hackathonRank(project: ProjectEntry): number {
  const place = project.hackathon?.placement?.toLowerCase() ?? "";
  if (place.includes("1st overall")) return 0;
  if (place.includes("1st") && (place.includes("track") || place.includes("·")))
    return 1;
  if (place.includes("1st")) return 2;
  if (place.includes("2nd")) return 3;
  if (place.includes("3rd")) return 4;
  if (place) return 5;
  return 50;
}

export function listHackathonProjects(
  options: Omit<ListProjectsOptions, "section"> = {},
) {
  return listProjects({ ...options, section: "hackathons" }).sort((a, b) => {
    const rank = hackathonRank(a) - hackathonRank(b);
    if (rank !== 0) return rank;
    return (b.hackathon?.year ?? 0) - (a.hackathon?.year ?? 0);
  });
}

/** Hackathon metadata for every entry in the hackathons section. */
export function listHackathonInfo() {
  return listHackathonProjects()
    .map((p) => ({
      projectId: p.id,
      name: p.name,
      hackathon: p.hackathon,
      links: p.links,
    }))
    .filter((p) => p.hackathon != null);
}
