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
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { TeamRequest, TeamValidator } from "@/lib/validators/team";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const AddTeamForm = () => {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<TeamRequest>({
    resolver: zodResolver(TeamValidator),
  });

  const { mutate: addTeam, isLoading } = useMutation({
    mutationFn: async ({ name }: TeamRequest) => {
      const payload: TeamRequest = { name };

      const { data } = await axios.post("/api/teams", payload);
      return data;
    },
    onError: () => {
      return toast({
        title: "Something went wrong.",
        description: "team wasn't created successfully. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    },
    onSuccess: () => {
      router.refresh();
      return toast({
        title: "team created.",
        description: "team was created successfully!",
        duration: 5000,
      });
    },
  });
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(() =>
          addTeam({
            name: form.getValues("name"),
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
                  placeholder="enter team name..."
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

export default AddTeamForm;
