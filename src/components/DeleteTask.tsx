"use client";

import { FC } from "react";
import { AlertDialogAction } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useToast } from "./ui/use-toast";

interface DeleteTaskProps {
  taskId: number;
}

const DeleteTask: FC<DeleteTaskProps> = ({ taskId }) => {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const { mutate: deleteTask, isLoading } = useMutation({
    mutationFn: async (id: number | undefined) => {
      if (id) {
        const { data } = await axios.delete(
          `/api/${params.projectId}/tasks/${id}`
        );
        return data;
      }
    },
    onError: () => {
      return toast({
        title: "Something went wrong.",
        description: "Task wasn't deleted successfully. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    },
    onSuccess: () => {
      router.refresh();
      return toast({
        title: "Task deleted.",
        description: "Task was deleted successfully!",
        duration: 5000,
      });
    },
  });
  return (
    <AlertDialogAction asChild>
      <Button
        variant="destructive"
        isLoading={isLoading}
        onClick={() => deleteTask(taskId)}
      >
        confirm
      </Button>
    </AlertDialogAction>
  );
};

export default DeleteTask;
