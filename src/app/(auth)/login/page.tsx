import { Icons } from "@/components/Icons";
import SignInButton from "@/components/SignInButton";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function login() {
  return (
    <section className="relative grid h-full place-content-center">
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: "ghost", size: "lg" }),
          "absolute left-4 top-4 md:left-8 md:top-20"
        )}
      >
        <ChevronLeft className="w-4 h-4" />
        Back
      </Link>
      <div className="container max-w-xl py-8 md:py-4 lg:py-0 flex flex-col items-center text-center space-y-6">
        <Icons.logo className="w-10 h-10" />
        <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
          Welcome Back to tasky
        </h2>
        <SignInButton />
        <p className="text-muted-foreground">
          By continuing, you are setting up a Breadit account and agree to our
          User Agreement and Privacy Policy.
        </p>
      </div>
    </section>
  );
}
