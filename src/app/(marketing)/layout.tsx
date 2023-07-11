import Navbar from "@/components/Navbar";
import { marketingLinks } from "@/constants/nav-links";
import React from "react";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar items={marketingLinks} />
      <main className="container pt-20">{children}</main>
    </>
  );
}
