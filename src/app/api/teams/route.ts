import { db } from "@/lib/prismadb";
import { getCurrentUser } from "@/lib/session";
import { TeamValidator } from "@/lib/validators/team";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name } = TeamValidator.parse(body);
    const user = await getCurrentUser();

    if (!user) {
      return new Response("Unauthorized", { status: 401 });
    }

    if (!name) {
      return new Response("name is required", { status: 403 });
    }

    await db.team.create({
      data: {
        name,
        userId: user.id,
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
