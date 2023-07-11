import React from "react";

export default function dashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="container h-screen">{children}</main>
    </>
  );
}
