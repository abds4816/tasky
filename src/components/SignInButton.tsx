"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { signIn } from "next-auth/react";
import { Icons } from "./Icons";
import { useToast } from "@/components/ui/use-toast";

const SignInButton = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loginWithGoogle = () => {
    setIsLoading(true);
    try {
      signIn("google");
    } catch (error) {
      setIsLoading(false);
      toast({
        title: "Uh oh! Something went wrong.",
        description: "There was a problem when trying logged in.",
        variant: "destructive",
      });
    }
  };

  return (
    <Button onClick={loginWithGoogle} size="lg" isLoading={isLoading}>
      {!isLoading && <Icons.google className="w-4 h-4" />}
      google
    </Button>
  );
};

export default SignInButton;
