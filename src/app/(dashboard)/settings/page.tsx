import PageHeader from "@/components/PageHeader";
import React from "react";

export const metadata = {
  title: "Settings | Tasky",
  description: "Generated by create next app",
};

export default function settings() {
  return (
    <div className="flex flex-col gap-y-6 md:gap-y-8">
      <PageHeader
        title="settings"
        description="Here you can manage your account easely!"
      />
    </div>
  );
}
