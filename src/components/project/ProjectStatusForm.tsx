"use client";

import { FC } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import {
  UpdateProjectRequest,
  UpdateProjectValidator,
} from "@/lib/validators/project";
import { useForm } from "react-hook-form";

interface ProjectStatusFormProps {
  id: string | undefined;
  isCompleted: boolean | undefined;
}

const ProjectStatusForm: FC<ProjectStatusFormProps> = ({ id, isCompleted }) => {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<UpdateProjectRequest>({
    resolver: zodResolver(UpdateProjectValidator),
  });

  const { mutate: UpdateStatus, isLoading } = useMutation({
    mutationFn: async ({ isCompleted }: UpdateProjectRequest) => {
      const payload: UpdateProjectRequest = { isCompleted };
      const { data } = await axios.patch(`/api/projects/${id}`, payload);
      return data;
    },
    onError: () => {
      return toast({
        title: "Something went wrong.",
        description:
          "Project status wasn't updated successfully. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    },
    onSuccess: () => {
      toast({
        title: "Project status updated.",
        description: "Project status was updated successfully!",
        duration: 5000,
      });
      //   router.refresh();
    },
  });
  return (
    <Form {...form}>
      <form
        onSubmit={(e) =>{
          e.preventDefault()
          UpdateStatus({ isCompleted: form.getValues("isCompleted") })
        }}
      >
        <FormField
          control={form.control}
          name="isCompleted"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between gap-4 rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Project status</FormLabel>
                <FormDescription>
                  mark this project as completed project.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  type="submit"
                  disabled={isLoading}
                  checked={field.value}
                  defaultChecked={isCompleted}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default ProjectStatusForm;
