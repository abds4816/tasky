import AddProject from "@/components/AddProject";
import PageHeader from "@/components/PageHeader";
import {
  EmptyState,
  EmptyStateActions,
  EmptyStateContent,
  EmptyStateDescription,
  EmptyStateIcon,
  EmptyStateTitle,
} from "@/components/ui/empty-state";
import { Folder } from "lucide-react";
import React from "react";

export default function projects() {
  return (
    <div className="flex flex-col gap-y-6 md:gap-y-8">
      <PageHeader
        title="projects"
        description="Here's a list of your projects!"
      />
      <EmptyState className="mt-4 md:mt-6 lg:mt-8">
        <EmptyStateContent>
          <EmptyStateIcon>
            <Folder className="w-10 h-10" />
          </EmptyStateIcon>
          <EmptyStateTitle>No projects added</EmptyStateTitle>
          <EmptyStateDescription>
            You have not added any projects. Add one below.
          </EmptyStateDescription>
          <EmptyStateActions>
            <AddProject />
          </EmptyStateActions>
        </EmptyStateContent>
      </EmptyState>
    </div>
  );
}
