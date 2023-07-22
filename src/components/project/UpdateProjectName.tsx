"use client";

import { FC } from "react";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

interface UpdateProjectNameProps {
  id: string | undefined;
  name: string | undefined;
}

const UpdateProjectName: FC<UpdateProjectNameProps> = ({ id, name }) => {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<UpdateProjectRequest>({
    resolver: zodResolver(UpdateProjectValidator),
    defaultValues: {
      newName: name || "",
    },
  });

  const { mutate: UpdateName, isLoading } = useMutation({
    mutationFn: async ({ newName }: UpdateProjectRequest) => {
      if (newName !== name) {
        const payload: UpdateProjectRequest = { newName };
        const { data } = await axios.patch(`/api/projects/${id}`, payload);
        return data;
      } else {
        return toast({
          description: "you need to enter a different name for this project.",
          duration: 5000,
        });
      }
    },
    onError: () => {
      router.push(`/projects/${id}`);
      router.refresh();
      return toast({
        title: "Project name updated.",
        description: "Project was updated successfully!",
        duration: 5000,
      });
    },
    onSuccess: () => {
      return toast({
        title: "Something went wrong.",
        description:
          "Project name wasn't updated successfully. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    },
  });
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(() =>
          UpdateName({
            newName: form.getValues("newName"),
          })
        )}
      >
        <CardContent>
          <FormField
            control={form.control}
            name="newName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input className="w-full md:w-80" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
        <Separator />
        <CardFooter className="flex justify-end py-2">
          <Button type="submit" isLoading={isLoading}>
            save
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
};

export default UpdateProjectName;
