"use client";

import React from "react";
import { DropdownMenuItem } from "./ui/dropdown-menu";
import { signOut } from "next-auth/react";

const SignOutButton = () => {
  return <DropdownMenuItem onClick={() => signOut()}>log out</DropdownMenuItem>;
};

export default SignOutButton;
