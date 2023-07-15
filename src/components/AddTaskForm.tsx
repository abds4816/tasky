"use client";

import React from "react";
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

const AddTaskForm = () => {
  const form = useForm<TaskRequest>({
    resolver: zodResolver(TaskValidator),
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(
          () => console.log("test")

          // addProject({
          //   name: form.getValues("name"),
          //   description: form.getValues("description"),
          // })
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
                  placeholder="enter task title..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="priority"
          render={({ field }) => (
            <FormItem>
              <FormLabel>priority</FormLabel>
              <Select>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      defaultValue=""
                      placeholder="select task priority"
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="TODO">todo</SelectItem>
                  <SelectItem value="IN_PROGRESS">in progress</SelectItem>
                  <SelectItem value="DONE">done</SelectItem>
                  <SelectItem value="CANCELED">canceled</SelectItem>
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>status</FormLabel>
              <Select>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      defaultValue=""
                      placeholder="select task status"
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="TODO">todo</SelectItem>
                  <SelectItem value="IN_PROGRESS">in progress</SelectItem>
                  <SelectItem value="DONE">done</SelectItem>
                  <SelectItem value="CANCELED">canceled</SelectItem>
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button
            type="submit"
            // isLoading={isLoading}
          >
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AddTaskForm;
