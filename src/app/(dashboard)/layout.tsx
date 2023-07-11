import Navbar from "@/components/Navbar";
import { dashboardLinks } from "@/constants/nav-links";
import React from "react";

export default function dashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar items={dashboardLinks} />
      <main className="container pt-12">{children}</main>
    </>
  );
}
