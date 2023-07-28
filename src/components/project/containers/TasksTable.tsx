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
import { DataTable } from "@/components/project/tasks/DataTable";
import { columns } from "@/components/project/tasks/Columns";
import { getTasks } from "@/actions/getTasks";
import TaskForm from "@/components/project/tasks/TaskForm";
import { Project } from "@prisma/client";
import { getMembers } from "@/actions/getMembers";

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
              form={<TaskForm teamMembers={teamMembers!} mode="create" />}
            />
          </EmptyStateActions>
        </EmptyStateContent>
      </EmptyState>
    );
  }
  return (
    <>
      <DataTable columns={columns} data={tasks} />
    </>
  );
};

export default TasksTable;
