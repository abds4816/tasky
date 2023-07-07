import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

export default async function dashboard() {
  const session = await getAuthSession();

  if (!session?.user) {
    redirect("/login");
  }

  return <div>dashboard</div>;
}
