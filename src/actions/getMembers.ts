import { db } from "@/lib/prismadb";
import { getCurrentUser } from "@/lib/session";

export async function getMembers(teamId?: string) {
  const user = await getCurrentUser();
  if (user) {
    if (teamId) {
      const memebrs = await db.teamMember.findMany({
        where: {
          teamId,
          userId: user.id,
        },
        include: {
          tasks: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      return memebrs;
    } else {
      const memebrs = await db.teamMember.findMany({
        where: {
          userId: user.id,
        },
        include: {
          tasks: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      return memebrs;
    }
  }
}
