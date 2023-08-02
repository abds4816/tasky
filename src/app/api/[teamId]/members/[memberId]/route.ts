import { getCurrentUser } from "@/lib/session";

export async function DELETE(
  req: Request,
  params: { params: { teamId: string; memberId: string } }
) {
  const user = await getCurrentUser();
  return user;
}
