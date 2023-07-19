import { getProjectById } from "@/actions/getProjectById";
import Loader from "@/components/Loader";
import PageHeader from "@/components/PageHeader";
import ProjectOverview from "@/components/project/containers/ProjectOverview";
import ProjectSettings from "@/components/project/containers/ProjectSettings";
import TasksTable from "@/components/project/containers/TasksTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { notFound } from "next/navigation";
import { FC, Suspense } from "react";

interface ProjectPageProps {
  params: {
    projectId: string;
  };
}

const page: FC<ProjectPageProps> = async ({ params }) => {
  const { projectId } = params;
  const project = await getProjectById(projectId);

  if (!project) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-y-6 md:gap-y-8">
      <PageHeader title={project?.name} description={project?.description} />
      <Tabs defaultValue="overview">
        <TabsList className="grid w-full md:w-80 grid-cols-3 mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <Suspense fallback={<Loader />}>
            <ProjectOverview project={project} tasks={project.tasks} />
          </Suspense>
        </TabsContent>
        <TabsContent value="tasks">
          <Suspense fallback={<Loader />}>
            <TasksTable tasks={project?.tasks.reverse()} />
          </Suspense>
        </TabsContent>
        <TabsContent value="settings">
          <Suspense fallback={<Loader />}>
            <ProjectSettings project={project} />
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default page;
