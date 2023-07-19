import { db } from "@/lib/prismadb";
import { getCurrentUser } from "@/lib/session";

export async function getProjectProgress(projectId: string | undefined) {
  const user = await getCurrentUser();
  const project = await db.project.findFirst({
    where: {
      id: projectId,
      userId: user?.id,
    },
    include: {
      tasks: true,
    },
  });
  // get tasks count
  const allTasks = project?.tasks.length;

  // get completed tasks count
  const completedTasks = project?.tasks.filter(
    (task) => task.status === "done"
  ).length;

  // get percentage of completed tasks
  const projectProgress = Math.floor((completedTasks! / allTasks!) * 100);
  return projectProgress;
}
