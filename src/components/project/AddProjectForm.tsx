"use client";

import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ProjectValidator, ProjectRequest } from "@/lib/validators/project";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

const AddProjectForm = () => {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<ProjectRequest>({
    resolver: zodResolver(ProjectValidator),
  });

  const { mutate: addProject, isLoading } = useMutation({
    mutationFn: async ({ name, description }: ProjectRequest) => {
      const payload: ProjectRequest = { name, description };

      const { data } = await axios.post("/api/projects", payload);
      return data;
    },
    onError: () => {
      return toast({
        title: "Something went wrong.",
        description: "Project wasn't created successfully. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    },
    onSuccess: () => {
      router.refresh();
      return toast({
        title: "Project created.",
        description: "Project was created successfully!",
        duration: 5000,
      });
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(() =>
          addProject({
            name: form.getValues("name"),
            description: form.getValues("description"),
          })
        )}
        className="space-y-6"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>name</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="enter project name..."
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                description{" "}
                <span className="text-muted-foreground">(optional)</span>
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="enter project description..."
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button type="submit" isLoading={isLoading}>
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AddProjectForm;
