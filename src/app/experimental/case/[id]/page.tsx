import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseStudyView from "@/components/CaseStudyView";
import { getProject, listProjectIds } from "@/content";

type PageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return listProjectIds().map((id) => ({ id }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const project = getProject(id);
  if (!project) return { title: "Not found" };

  return {
    title: `${project.name} · James Yang`,
    description: project.blurb || project.summary,
  };
}

export default async function ExperimentalCaseStudyPage({ params }: PageProps) {
  const { id } = await params;
  const project = getProject(id);
  if (!project) notFound();

  return <CaseStudyView project={project} homeHref="/experimental" />;
}
