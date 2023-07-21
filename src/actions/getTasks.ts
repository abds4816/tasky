import { db } from "@/lib/prismadb";
import { getCurrentUser } from "@/lib/session";

export async function getTasks(projectId: string) {
  const user = await getCurrentUser();
  if (user) {
    const tasks = await db.task.findMany({
      where: {
        projectId: projectId,
        userId: user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return tasks;
  } else {
    return null;
  }
}
