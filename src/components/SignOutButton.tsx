"use client";

import React from "react";
import { DropdownMenuItem } from "./ui/dropdown-menu";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

const SignOutButton = () => {
  return (
    <DropdownMenuItem onClick={() => signOut()}>
      <LogOut className="w-4 h-4 mr-2" />
      log out
    </DropdownMenuItem>
  );
};

export default SignOutButton;
