import { db } from "@/lib/prismadb";
import { getCurrentUser } from "@/lib/session";
import { z } from "zod";

export async function DELETE(
  req: Request,
  {
    params,
  }: {
    params: {
      teamId: string;
    };
  }
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return new Response("Unauthorized", { status: 403 });
    }
    if (!params.teamId) {
      return new Response("teamId is required!", { status: 400 });
    }

    const team = await db.team.delete({
      where: {
        id: params.teamId,
      },
    });

    return team;
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
