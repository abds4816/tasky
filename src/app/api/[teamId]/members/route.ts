import { db } from "@/lib/prismadb";
import { getCurrentUser } from "@/lib/session";
import { MemberValidator } from "@/lib/validators/member";
import * as z from "zod";

export async function POST(
  req: Request,
  { params }: { params: { teamId: string } }
) {
  try {
    const body = await req.json();
    const { name, email, role, imageUrl } = MemberValidator.parse(body);
    const user = await getCurrentUser();
    if (!user) {
      return new Response("Unauthorized", { status: 401 });
    }
    if (!name) {
      return new Response("member name is required", { status: 403 });
    }
    if (!email) {
      return new Response("member email is required", { status: 403 });
    }
    if (!role) {
      return new Response("member role is required", { status: 403 });
    }
    if (!params.teamId) {
      return new Response("team id is required", { status: 403 });
    }

    const member = await db.teamMember.create({
      data: {
        name,
        email,
        role,
        imageUrl,
        teamId: params.teamId,
        userId: user.id,
      },
    });
    return member;
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
