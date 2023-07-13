"use client";

import React, { FC } from "react";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

interface DeleteProjectProps {
  projectId: string | undefined;
}

const DeleteProject: FC<DeleteProjectProps> = ({ projectId }) => {
  const { toast } = useToast();
  const router = useRouter();

  const { mutate: deleteProject, isLoading } = useMutation({
    mutationFn: async (id: string | undefined) => {
      if (id) {
        const { data } = await axios.delete("/api/" + id);
        return data;
      }
    },
    onError: () => {
      return toast({
        title: "Something went wrong.",
        description: "Project wasn't deleted successfully. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    },
    onSuccess: () => {
      router.push("/projects");
      return toast({
        title: "project deleted.",
        description: "Project was deleted successfully!",
        duration: 5000,
      });
    },
  });

  return (
    <Button
      variant="destructive"
      isLoading={isLoading}
      onClick={() => deleteProject(projectId)}
    >
      delete
    </Button>
  );
};

export default DeleteProject;
