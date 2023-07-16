import { db } from "@/lib/prismadb";
import { getCurrentUser } from "@/lib/session";

export async function getCompletedTasks() {
  const user = await getCurrentUser();
  const projects = await db.project.findMany({
    where: {
      userId: user?.id,
    },
    include: {
      tasks: true,
    },
  });
  return projects;
}
