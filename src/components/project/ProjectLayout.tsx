import { FC, ReactNode } from "react";
import PageHeader from "@/components/PageHeader";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { Project } from "@prisma/client";

interface ProjectLayoutProps {
  project: Project | undefined;
  children: ReactNode;
  activeTab: "overview" | "tasks" | "settings";
}

const ProjectLayout: FC<ProjectLayoutProps> = ({
  project,
  activeTab,
  children,
}) => {
  return (
    <>
      <PageHeader title={project?.name} description={project?.description} />
      <Tabs defaultValue={activeTab}>
        <TabsList className="grid w-full md:w-80 grid-cols-3 mb-4">
          <Link href={`/projects/${project?.id}`} className="w-full">
            <TabsTrigger value="overview">Overview</TabsTrigger>
          </Link>
          <Link href={`/projects/${project?.id}/tasks`} className="w-full">
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
          </Link>
          <Link href={`/projects/${project?.id}/settings`} className="w-full">
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </Link>
        </TabsList>
        {children}
      </Tabs>
    </>
  );
};

export default ProjectLayout;
