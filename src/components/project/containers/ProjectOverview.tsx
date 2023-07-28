import { getCompletedTasks } from "@/actions/getCompletedTasks";
import { getProjectProgress } from "@/actions/getProjectProgress";
import { getTasksByStatus } from "@/actions/getTasksByStatus";
import StatisticCard from "@/components/StatisticCard";
import ProjectTasksClassment from "@/components/charts/ProjectTasksClassment";
import { Project, Task } from "@prisma/client";
import { ClipboardCheck, ClipboardList, TrendingUp } from "lucide-react";
import { FC } from "react";

interface ProjectOverviewProps {
  project: Project | null | undefined;
  tasks: Task[] | undefined;
}

const ProjectOverview: FC<ProjectOverviewProps> = async ({
  project,
  tasks,
}) => {
  const projectProgress = await getProjectProgress(project?.id);
  const completedTasks = await getCompletedTasks(project?.id);
  const data = [
    {
      name: "todo",
      value: await getTasksByStatus({
        projectId: project?.id!,
        status: "todo",
      }),
    },
    {
      name: "in progress",
      value: await getTasksByStatus({
        projectId: project?.id!,
        status: "in progress",
      }),
    },
    {
      name: "done",
      value: await getTasksByStatus({
        projectId: project?.id!,
        status: "done",
      }),
    },
    {
      name: "canceled",
      value: await getTasksByStatus({
        projectId: project?.id!,
        status: "canceled",
      }),
    },
  ];
  return (
    <section className="flex flex-col gap-6 md:gap-8 mt-8">
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatisticCard
          title="total tasks"
          value={tasks?.length!}
          icon={<ClipboardList />}
          percentageChange={5}
          description="test"
          unit="tasks"
        />
        <StatisticCard
          title="completed tasks"
          value={completedTasks.length}
          icon={<ClipboardCheck />}
          percentageChange={5}
          description="test"
          unit="tasks"
        />
        <StatisticCard
          title="project progress"
          value={projectProgress}
          icon={<TrendingUp />}
          percentageChange={5}
          description="test"
          unit="%"
        />
      </section>
      <section className="grid grid-cols-12 gap-4">
        <p className="col-span-12 lg:col-span-8">hi!</p>
        <ProjectTasksClassment data={data} tasksCount={tasks?.length!} />
      </section>
    </section>
  );
};

export default ProjectOverview;
