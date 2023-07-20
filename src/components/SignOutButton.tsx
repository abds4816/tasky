"use client";

import React from "react";
import { DropdownMenuItem } from "./ui/dropdown-menu";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

const SignOutButton = () => {
  return (
    <DropdownMenuItem className="cursor-pointer" onClick={() => signOut()}>
      Sign out
    </DropdownMenuItem>
  );
};

export default SignOutButton;
