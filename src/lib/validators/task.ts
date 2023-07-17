import * as z from "zod";

export const TaskValidator = z.object({
  title: z
    .string({ required_error: "task title is required" })
    .min(3, "task title must be at least 3 characters"),
  status: z.string({
    required_error: "Please select a status",
  }),
  priority: z.string({ required_error: "Please select a priority" }),
});

export type TaskRequest = z.infer<typeof TaskValidator>;

export const taskDefaultValues: Partial<TaskRequest> = {
  status: "TODO",
  priority: "MEDIUM",
};
