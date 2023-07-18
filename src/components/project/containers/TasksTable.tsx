import { Task } from "@prisma/client";
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
import AddTaskForm from "@/components/AddTaskForm";
import { DataTable } from "@/components/project/tasks/DataTable";
import { columns } from "@/components/project/tasks/Columns";

interface TasksTableProps {
  tasks: Task[] | undefined;
}

const TasksTable: FC<TasksTableProps> = async ({ tasks }) => {
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
            <AddEntityModal entity="task" form={<AddTaskForm />} />
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
