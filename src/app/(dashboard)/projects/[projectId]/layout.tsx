import React, { ReactNode } from "react";

export default function projectLayout({ children }: { children: ReactNode }) {
  return <div className="flex flex-col gap-y-6 md:gap-y-8">{children}</div>;
}
