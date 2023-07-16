import { getCompletedTasks } from "@/actions/getCompletedTasks";
import { getProjects } from "@/actions/getProjects";
import PageHeader from "@/components/PageHeader";
import StatisticCard from "@/components/StatisticCard";
import { Card } from "@/components/ui/card";
import { Check, Folders } from "lucide-react";

export default async function dashboard() {
  const projects = await getProjects();
  const completedTasks = await getCompletedTasks();
  return (
    <div className="flex flex-col gap-y-6 md:gap-y-8">
      <PageHeader title="dashboard" />
      {/* staistics cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatisticCard
          title="Total projects"
          icon={<Folders />}
          value={projects.length}
          percentageChange={100}
          description="test desc"
        />
        <StatisticCard
          title="Completed Tasks"
          icon={<Check />}
          value={completedTasks.length}
          percentageChange={100}
          description="test desc"
        />
      </section>
      {/* staistics cards */}

      <section className="grid grid-cols-12 gap-4">
        <Card className="h-20 col-span-12 lg:col-span-7"></Card>
        <Card className="h-20 col-span-12 lg:col-span-5"></Card>
      </section>
    </div>
  );
}
