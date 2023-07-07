import { Icons } from "@/components/Icons";
import SignInButton from "@/components/SignInButton";
import React from "react";

export default function login() {
  return (
    <section className="grid place-content-center mt-20 md:mt-36">
      <div className="container max-w-xl py-8 flex flex-col items-center text-center space-y-6">
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
