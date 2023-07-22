import { getProjectById } from "@/actions/getProjectById";
import Loader from "@/components/Loader";
import PageHeader from "@/components/PageHeader";
import ProjectLayout from "@/components/project/ProjectLayout";
import ProjectOverview from "@/components/project/containers/ProjectOverview";
import ProjectSettings from "@/components/project/containers/ProjectSettings";
import TasksTable from "@/components/project/containers/TasksTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FC, Suspense } from "react";

interface ProjectPageProps {
  params: {
    projectId: string;
  };
}

export const metadata = {
  title: "Project Overview | Tasky",
  description: "Generated by create next app",
};

const page: FC<ProjectPageProps> = async ({ params }) => {
  const { projectId } = params;
  const project = await getProjectById(projectId);

  if (!project) {
    notFound();
  }

  return (
    <ProjectLayout project={project} activeTab="overview">
      <ProjectOverview project={project} tasks={project.tasks} />
    </ProjectLayout>
  );
};

export default page;
