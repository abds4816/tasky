import { FC } from "react";
import {
  EmptyState,
  EmptyStateActions,
  EmptyStateContent,
  EmptyStateDescription,
  EmptyStateIcon,
  EmptyStateTitle,
} from "@/components/ui/empty-state";
import { LayoutList } from "lucide-react";
import AddEntityModal from "@/components/AddEntityModal";
import { getTasks } from "@/actions/getTasks";
import { Project } from "@prisma/client";
import { getMembers } from "@/actions/getMembers";
import AddTaskForm from "@/components/project/tasks/AddTaskForm";
import { DataTable } from "@/components/data-table/DataTable";
import { taskColumns } from "@/components/project/tasks/TaskColumns";

interface TasksTableProps {
  project: Project | undefined;
}

const TasksTable: FC<TasksTableProps> = async ({ project }) => {
  const tasks = await getTasks(project?.id!);
  const teamMembers = await getMembers(project?.teamId!);
  if (!tasks?.length) {
    return (
      <EmptyState>
        <EmptyStateContent>
          <EmptyStateIcon>
            <LayoutList className="w-10 h-10" />
          </EmptyStateIcon>
          <EmptyStateTitle>No tasks added</EmptyStateTitle>
          <EmptyStateDescription>
            You have not added any tasks. Add one below.
          </EmptyStateDescription>
          <EmptyStateActions>
            <AddEntityModal
              entity="task"
              form={<AddTaskForm teamMembers={teamMembers!} />}
            />
          </EmptyStateActions>
        </EmptyStateContent>
      </EmptyState>
    );
  }
  return (
    <DataTable
      columns={taskColumns}
      data={tasks}
      form={<AddTaskForm teamMembers={teamMembers} />}
      entity="task"
      searchColumn="title"
    />
  );
};

export default TasksTable;
