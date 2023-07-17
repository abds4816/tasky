import * as z from "zod";

export const TaskValidator = z.object({
  title: z
    .string({ required_error: "task title is required" })
    .min(3, "task title must be at least 3 characters"),
  status: z.enum(["todo", "in progress", "done", "canceled"], {
    required_error: "Please select a status",
    invalid_type_error: "Select a status",
  }),
  priority: z.enum(["low", "medium", "high"], {
    required_error: "Please select a priority",
    invalid_type_error: "Select a priority",
  }),
});

export type TaskRequest = z.infer<typeof TaskValidator>;
