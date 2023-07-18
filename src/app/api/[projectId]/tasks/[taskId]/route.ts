import { db } from "@/lib/prismadb";
import { getCurrentUser } from "@/lib/session";
import { z } from "zod";

export async function DELETE(
  req: Request,
  {
    params,
  }: {
    params: {
      projectId: string;
    };
  }
) {
  try {
    const body = await req.json();
    const { id } = body;
    const user = await getCurrentUser();
    if (!user) {
      return new Response("Unauthorized", { status: 403 });
    }
    if (!params.projectId) {
      return new Response("projectId is required!", { status: 400 });
    }
    if (id) {
      return new Response("taskId is required!", { status: 400 });
    }

    const task = await db.task.delete({
      where: {
        id,
      },
    });

    return task;
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
