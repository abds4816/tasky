import * as z from "zod";

export const ProjectValidator = z.object({
  name: z.string().min(3, "project name must be at least 3 characters"),
  description: z.string().optional(),
  teamId: z.string({ required_error: "Please select a team." }).min(3),
});

export type ProjectRequest = z.infer<typeof ProjectValidator>;

export const UpdateProjectValidator = z.object({
  newName: z
    .string({ required_error: "name is required" })
    .min(3, "project name must be at least 3 charachters")
    .optional(),
  isCompleted: z.boolean().default(false).optional(),
});

export type UpdateProjectRequest = z.infer<typeof UpdateProjectValidator>;
