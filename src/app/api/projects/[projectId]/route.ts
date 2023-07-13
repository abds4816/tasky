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
    const { name, description } = UpdateProjectValidator.parse(body);
    const user = await getCurrentUser();
    if (!user) {
      return new Response("Unauthorized", { status: 401 });
    }
    const existingProject = await db.project.update({
      where: {
        id: params.projectId,
      },
      data: {
        name,
        description,
      },
    });

    return existingProject;
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

    const project = await db.project.deleteMany({
      where: {
        id: params.projectId,
        userId: user.id,
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
