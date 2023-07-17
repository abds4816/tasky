import { db } from "@/lib/prismadb";
import { getCurrentUser } from "@/lib/session";
import { TaskValidator } from "@/lib/validators/task";
import { z } from "zod";

export async function POST(
  req: Request,
  { params }: { params: { projectId: string } }
) {
  try {
    const body = await req.json();
    const { title, status, priority } = TaskValidator.parse(body);
    const user = await getCurrentUser();
    if (!user) {
      return new Response("Unauthorized", { status: 401 });
    }

    if (!title) {
      return new Response("title is required", { status: 403 });
    }
    if (!status) {
      return new Response("status is required", { status: 403 });
    }
    if (!priority) {
      return new Response("priority is required", { status: 403 });
    }
    const currentProject = await db.project.findFirst({
      where: {
        id: params.projectId,
        userId: user.id,
      },
    });
    if (!currentProject) {
      return new Response("Unauthorized", { status: 405 });
    }
    await db.task.create({
      data: {
        title,
        userId: user.id,
        status,
        priority,
        projectId: params.projectId,
      },
    });
    return new Response("ok");
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 });
    }

    return new Response(
      "Could not post to subreddit at this time. Please try later",
      { status: 500 }
    );
  }
}
