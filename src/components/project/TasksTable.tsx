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
import AddEntityModal from "../AddEntityModal";
import AddTaskForm from "../AddTaskForm";

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
      {tasks.map((task) => (
        <p key={task.id}>{task.title}</p>
      ))}
    </>
  );
};

export default TasksTable;
