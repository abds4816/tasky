"use client";

import React, { FC } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TaskRequest, TaskValidator } from "@/lib/validators/task";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { Task, TeamMember } from "@prisma/client";

type UpdateTaskFormProps = {
  teamMembers?: TeamMember[] | undefined;
  task: Task | undefined;
};

const UpdateTaskForm: FC<UpdateTaskFormProps> = ({ teamMembers, task }) => {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<TaskRequest>({
    resolver: zodResolver(TaskValidator),
    mode: "onChange",
  });

  // add task
  const { mutate: addTask, isLoading } = useMutation({
    mutationFn: async ({ title, status, priority }: TaskRequest) => {
      const payload: TaskRequest = { title, status, priority };
      const { data } = await axios.patch(
        `/api/projects/${params.projectId}/tasks/${task?.id}`,
        payload
      );
      return data;
    },
    onError: () => {
      return toast({
        title: "Something went wrong",
        description: "Task wasn't created successfully. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    },
    onSuccess: () => {
      router.refresh();
      return toast({
        title: "Task created.",
        description: "Task was created successfully!",
        duration: 5000,
      });
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(() =>
          addTask({
            title: form.getValues("title"),
            status: form.getValues("status"),
            priority: form.getValues("priority"),
          })
        )}
        className="space-y-6"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>title</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  disabled={isLoading}
                  placeholder="enter task title..."
                  defaultValue={task?.title}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select
                disabled={isLoading}
                onValueChange={field.onChange}
                defaultValue={task?.status}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="select task status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="todo">todo</SelectItem>
                  <SelectItem value="in progress">in progress</SelectItem>
                  <SelectItem value="done">done</SelectItem>
                  <SelectItem value="canceled">canceled</SelectItem>
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="priority"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Priority</FormLabel>
              <Select
                disabled={isLoading}
                onValueChange={field.onChange}
                defaultValue={task?.priority}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="select task priority" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="low">low</SelectItem>
                  <SelectItem value="medium">medium</SelectItem>
                  <SelectItem value="high">high</SelectItem>
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="assignee"
          render={({ field }) => (
            <FormItem>
              <FormLabel>assign to</FormLabel>
              <Select
                disabled={isLoading || !teamMembers?.length}
                onValueChange={field.onChange}
                defaultValue={task?.assignee!}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="assign task to member" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {teamMembers?.map((member) => (
                    <SelectItem key={member.id} value={member.id}>
                      {member.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {!teamMembers?.length && (
                <FormMessage>no members in this team!</FormMessage>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button type="submit" isLoading={isLoading}>
            Update
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default UpdateTaskForm;
