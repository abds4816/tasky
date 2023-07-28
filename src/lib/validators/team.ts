import * as z from "zod";

export const TeamValidator = z.object({
  name: z
    .string({ required_error: "team name is required" })
    .min(3, "name must be at least 3 characters"),
});

export type TeamRequest = z.infer<typeof TeamValidator>;
