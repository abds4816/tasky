import { db } from "@/lib/prismadb";
import { getCurrentUser } from "@/lib/session";

export async function getTeams() {
  const user = await getCurrentUser();
  if (user) {
    const teams = await db.team.findMany({
      where: {
        userId: user.id,
      },
      include: {
        members: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return teams;
  }
}
