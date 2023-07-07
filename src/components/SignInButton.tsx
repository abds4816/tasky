"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { signIn } from "next-auth/react";
import { Icons } from "./Icons";

const SignInButton = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loginWithGoogle = () => {
    setIsLoading(true);
    signIn("google");
  };

  return (
    <Button onClick={loginWithGoogle} size="lg" isLoading={isLoading}>
      {!isLoading && <Icons.google className="w-4 h-4" />}
      google
    </Button>
  );
};

export default SignInButton;
