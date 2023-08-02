"use client";

import { FC, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Task } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import TaskForm from "@/components/project/tasks/TaskForm";

interface TaskActionsProps {
  task: Task;
}

const TaskActions: FC<TaskActionsProps> = ({ task }) => {
  const [showDeleteAlert, setShowDeleteAlert] = useState<boolean>(false);
  const [openUpdateTask, setOpenUpdateTask] = useState<boolean>(false);
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const { mutate: deleteTask, isLoading } = useMutation({
    mutationFn: async (id: number) => {
      if (id) {
        const { data } = await axios.delete(
          `/api/${params.projectId}/tasks/${id}`
        );
        return data;
      }
    },
    onError: () => {
      setShowDeleteAlert(false);
      return toast({
        title: "Something went wrong.",
        description: "Task wasn't deleted successfully. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    },
    onSuccess: () => {
      setShowDeleteAlert(false);
      router.refresh();
      return toast({
        title: "Task deleted.",
        description: "Task was deleted successfully!",
        duration: 5000,
      });
    },
  });
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onSelect={() => setOpenUpdateTask(true)}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem>Make a copy</DropdownMenuItem>
          <DropdownMenuItem>Favorite</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={() => setShowDeleteAlert(true)}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
              variant="destructive"
              isLoading={isLoading}
              onClick={() => {
                setShowDeleteAlert(true);
                deleteTask(task.id);
              }}
            >
              confirm
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Dialog open={openUpdateTask} onOpenChange={setOpenUpdateTask}>
        <DialogContent>
          <DialogHeader className="font-semibold capitalize text-xl">
            Update Task
          </DialogHeader>
          {/* <TaskForm teamMembers={} mode="update" task={task} /> */}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TaskActions;
