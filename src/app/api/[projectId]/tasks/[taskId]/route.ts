import { db } from "@/lib/prismadb";
import { getCurrentUser } from "@/lib/session";
import { TaskValidator } from "@/lib/validators/task";
import { z } from "zod";

export async function PATCH(
  req: Request,
  {
    params,
  }: {
    params: {
      taskId: number;
      projectId: string;
    };
  }
) {
  try {
    const user = await getCurrentUser();
    const body = await req.json();
    const { title, status, priority } = TaskValidator.parse(body);

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

    await db.task.update({
      where: {
        id: params.taskId,
      },
      data: {
        title,
        status,
        priority,
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

export async function DELETE(
  req: Request,
  {
    params,
  }: {
    params: {
      projectId: string;
      taskId: number;
    };
  }
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return new Response("Unauthorized", { status: 403 });
    }
    const project = await db.project.findFirst({
      where: {
        id: params.projectId,
        userId: user.id,
      },
    });
    if (!project) {
      return new Response("Unauthorized", { status: 403 });
    }
    if (!params.taskId) {
      return new Response("taskId is required!", { status: 400 });
    }

    const deletedTask = await db.task.delete({
      where: {
        id: params.taskId,
      },
    });
    console.log("project found");

    return deletedTask;
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
