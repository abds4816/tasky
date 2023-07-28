import { db } from "@/lib/prismadb";
import { getCurrentUser } from "@/lib/session";

export async function getTeamById(teamId: string) {
  const user = await getCurrentUser();
  if (user) {
    const team = await db.team.findFirst({
      where: {
        id: teamId,
        userId: user.id,
      },
      include: {
        members: true,
        project: true,
      },
    });
    return team;
  }
}
