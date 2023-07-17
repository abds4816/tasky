import { db } from "@/lib/prismadb";
import { getCurrentUser } from "@/lib/session";

export async function getCompletedTasks() {
  const user = await getCurrentUser();
  const tasks = await db.task.findMany({
    where: {
      userId: user?.id,
      status: "done",
    },
  });
  return tasks;
}
