import { db } from "@/lib/prismadb";
import { getCurrentUser } from "@/lib/session";

interface Props {
  projectId: string;
  status: "todo" | "in progress" | "done" | "canceled";
}

export async function getTasksByStatus({ projectId, status }: Props) {
  const user = await getCurrentUser();

  const tasks = await db.task.findMany({
    where: {
      projectId: projectId,
      userId: user?.id,
      status,
    },
  });

  return tasks.length;
}
