import React from "react";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="pt-20">
      <div className="container">{children}</div>
    </main>
  );
}
