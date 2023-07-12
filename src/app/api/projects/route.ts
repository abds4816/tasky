import { db } from "@/lib/prismadb";
import { getCurrentUser } from "@/lib/session";
import { ProjectValidator } from "@/lib/validators/project";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const body = req.json();
    const { name, description } = ProjectValidator.parse(body);
    const user = await getCurrentUser();

    if (!user) {
      return new Response("Unauthorized", { status: 401 });
    }

    if (!name) {
      return new Response("name is required", { status: 403 });
    }

    await db.project.create({
      data: {
        userId: user.id,
        name,
        description,
      }
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
