"use client";

import React, { FC, useState } from "react";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface DeleteProjectProps {
  projectId: string | undefined;
}

const DeleteProject: FC<DeleteProjectProps> = ({ projectId }) => {
  const [showAlertDialog, setShowAlertDialog] = useState<boolean>(false);
  const { toast } = useToast();
  const router = useRouter();

  const { mutate: deleteProject, isLoading } = useMutation({
    mutationFn: async (id: string | undefined) => {
      if (id) {
        const { data } = await axios.delete(`/api/projects/${id}`);
        return data;
      }
    },
    onError: () => {
      router.refresh();
      router.push("/projects");
      return toast({
        title: "project deleted.",
        description: "Project was deleted successfully!",
        duration: 5000,
      });
    },
    onSuccess: () => {
      return toast({
        title: "Something went wrong.",
        description: "Project wasn't deleted successfully. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    },
  });

  return (
    <AlertDialog open={showAlertDialog} onOpenChange={setShowAlertDialog}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">delete</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this
            project and remove its data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            variant="destructive"
            isLoading={isLoading}
            onClick={() => {
              deleteProject(projectId);
            }}
          >
            delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteProject;
