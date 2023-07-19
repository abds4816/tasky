import { getCompletedTasks } from "@/actions/getCompletedTasks";
import { getProjectProgress } from "@/actions/getProjectProgress";
import StatisticCard from "@/components/StatisticCard";
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
  return (
    <section className="mt-8">
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
    </section>
  );
};

export default ProjectOverview;
