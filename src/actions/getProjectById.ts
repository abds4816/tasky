import { db } from "@/lib/prismadb";
import { getCurrentUser } from "@/lib/session";

export async function getProjectById(id: string) {
  const user = await getCurrentUser();
  const project = await db.project.findFirst({
    where: {
      userId: user?.id,
      id: id,
    },
    include: {
      tasks: true,
    },
  });

  return project;
}
