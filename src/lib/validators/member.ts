import * as z from "zod";

export const MemberValidator = z.object({
  name: z
    .string({ required_error: "member name is required" })
    .min(3, "name must be at least 3 characters"),
  email: z.string({ required_error: "email is required" }).email(),
  role: z.string({ required_error: "member role is required" }).min(1),
  imageUrl: z.string().min(1).optional(),
  // team: z.string({ required_error: "user should be a member of team" }).min(3),
});
export type MemberRequest = z.infer<typeof MemberValidator>;
