import { db } from "@/lib/prismadb";
import { getCurrentUser } from "@/lib/session";
import { UpdateProjectValidator } from "@/lib/validators/project";
import { z } from "zod";

export async function PATCH(
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
    const { newName } = UpdateProjectValidator.parse(body);
    const user = await getCurrentUser();
    if (!user) {
      return new Response("Unauthorized", { status: 401 });
    }
    if (!newName) {
      return new Response("name is required", { status: 403 });
    }

    await db.project.updateMany({
      where: {
        id: params.projectId,
        userId: user.id,
      },
      data: {
        name: newName,
      },
    });
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
    };
  }
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return new Response("Unauthorized", { status: 403 });
    }
    if (!params.projectId) {
      return new Response("projectId is required!", { status: 400 });
    }

    const project = await db.project.delete({
      where: {
        id: params.projectId,
      },
    });

    return project;
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
