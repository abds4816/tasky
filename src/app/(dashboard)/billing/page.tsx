import PageHeader from "@/components/PageHeader";
import React from "react";

export default function billing() {
  return (
    <div className="flex flex-col gap-y-6 md:gap-y-8">
      <PageHeader
        title="billing"
        description="Here you can manage your subscription!"
      />
    </div>
  );
}
