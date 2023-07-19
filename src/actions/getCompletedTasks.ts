import { db } from "@/lib/prismadb";
import { getCurrentUser } from "@/lib/session";

export async function getCompletedTasks(projectId: string | undefined) {
  const user = await getCurrentUser();
  if (projectId) {
    const tasks = await db.task.findMany({
      where: {
        userId: user?.id,
        projectId,
        status: "done",
      },
    });
    return tasks;
  } else {
    const tasks = await db.task.findMany({
      where: {
        userId: user?.id,
        status: "done",
      },
    });
    return tasks;
  }
}
