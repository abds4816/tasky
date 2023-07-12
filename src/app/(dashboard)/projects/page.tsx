import { getProjects } from "@/actions/getProjects";
import AddProject from "@/components/AddProject";
import PageHeader from "@/components/PageHeader";
import ProjectCard from "@/components/ProjectCard";
import {
  EmptyState,
  EmptyStateActions,
  EmptyStateContent,
  EmptyStateDescription,
  EmptyStateIcon,
  EmptyStateTitle,
} from "@/components/ui/empty-state";
import { Input } from "@/components/ui/input";
import { Folder } from "lucide-react";
import React from "react";

export default async function projects() {
  const projects = await getProjects();
  return (
    <div className="flex flex-col gap-y-6 md:gap-y-8">
      <PageHeader
        title="projects"
        description="Here's a list of your projects!"
      />
      {!projects.length ? (
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
      ) : (
        <section className="flex flex-col gap-8">
          <div className="flex items-center justify-between gap-4">
            <Input type="search" placeholder="search projects..." />
            <AddProject />
          </div>
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))}
          </section>
        </section>
      )}
    </div>
  );
}
