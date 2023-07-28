"use client";

import { FC } from "react";
import ChartCard from "@/components/ChartCard";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Task } from "@prisma/client";

interface ProjectTasksClassmentProps {
  data: any[];
  tasksCount: number;
}

const ProjectTasksClassment: FC<ProjectTasksClassmentProps> = ({
  data,
  tasksCount,
}) => {
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  return (
    <ChartCard
      title="Project Overview"
      description="Classment of tasks in this project"
      className="col-span-12 lg:col-span-4"
    >
      {tasksCount ? (
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={data}
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <div className="grid place-content-center">
          <p className="text-muted-foreground text-sm">no task to display!</p>
        </div>
      )}
    </ChartCard>
  );
};

export default ProjectTasksClassment;
