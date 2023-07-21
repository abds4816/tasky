import { db } from "@/lib/prismadb";
import { getCurrentUser } from "@/lib/session";

interface Props {
  day: Date;
  projectId: string;
}

export async function getDailyCompletedTasks({ day, projectId }: Props) {
  const user = await getCurrentUser();
  if (user) {
    const dailyTasks = await db.task.groupBy({
      by: ["updatedAt"],
      where: {
        projectId,
        userId: user.id,
        status: "done",
        updatedAt: day,
      },
    });
    return dailyTasks;
  } else {
    return null;
  }
}
