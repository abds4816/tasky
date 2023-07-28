"use client";

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
import { FC, useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface DeleteTeamProps {
  teamId: string;
}

const DeleteTeam: FC<DeleteTeamProps> = ({ teamId }) => {
  const [showAlertDialog, setShowAlertDialog] = useState<boolean>(false);
  const { toast } = useToast();
  const router = useRouter();

  const { mutate: deleteTeam, isLoading } = useMutation({
    mutationFn: async (id: string | undefined) => {
      const { data } = await axios.delete(`/api/teams/${id}`);
      return data;
    },
    onError: () => {
      router.refresh();
      router.push("/teams");
      return toast({
        title: "team deleted.",
        description: "Team was deleted successfully!",
        duration: 5000,
      });
    },
    onSuccess: () => {
      return toast({
        title: "Something went wrong.",
        description: "Team wasn't deleted successfully. Please try again.",
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
              deleteTeam(teamId);
            }}
          >
            delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteTeam;
