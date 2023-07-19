"use client";

import { Project } from "@prisma/client";
import { FC, useState } from "react";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  UpdateProjectRequest,
  UpdateProjectValidator,
} from "@/lib/validators/project";
import { zodResolver } from "@hookform/resolvers/zod";

interface UpdateProjectNameProps {
  id: string | undefined;
  name: string | undefined;
}

const UpdateProjectName: FC<UpdateProjectNameProps> = ({ id, name }) => {
  const { toast } = useToast();
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<UpdateProjectRequest>({
    resolver: zodResolver(UpdateProjectValidator),
    defaultValues: {
      name: name || "",
    },
  });

  const { mutate: UpdateName, isLoading } = useMutation({
    mutationFn: async ({ name }: UpdateProjectRequest) => {
      const payload: UpdateProjectRequest = { name };
      if (name) {
        if (name?.length < 3) {
          const { data } = await axios.patch(`/api/projects/${id}`, payload);
          return data;
        }
      }
    },
    onError: () => {
      return toast({
        title: "Something went wrong.",
        description:
          "Project name wasn't updated successfully. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    },
    onSuccess: () => {
      toast({
        title: "Project name updated.",
        description: "Project was updated successfully!",
        duration: 5000,
      });
      router.refresh();
    },
  });
  return (
    <form onSubmit={handleSubmit((e) => UpdateName(e))}>
      <CardContent>
        <Input className="w-full md:w-80" {...register("name")} />
        {errors.name && (
          <p className="pt-2 text-xs text-destructive">{errors.name.message}</p>
        )}
      </CardContent>
      <Separator />
      <CardFooter className="flex justify-end py-2">
        <Button type="submit" isLoading={isLoading}>
          save
        </Button>
      </CardFooter>
    </form>
  );
};

export default UpdateProjectName;
