import * as z from "zod";

export const ProjectValidator = z.object({
  name: z.string().min(3, "project name must be at least 3 characters"),
  description: z.string().optional(),
});

export type ProjectRequest = z.infer<typeof ProjectValidator>;

export const UpdateProjectValidator = z.object({
  name: z.string().min(3),
});

export type UpdateProjectRequest = z.infer<typeof UpdateProjectValidator>;
