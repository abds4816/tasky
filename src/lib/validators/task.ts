import { z } from "zod";

export const TaskValidator = z.object({
  title: z.string().min(3, "task title must be at least 3 characters"),
  status: z.enum(["TODO", "IN_PROGRESS", "DONE", "CANCELED"]),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
});

export type TaskRequest = z.infer<typeof TaskValidator>;
