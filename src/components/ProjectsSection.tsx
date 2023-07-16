"use client";

import { FC, useState } from "react";
import { Input } from "@/components/ui/input";
import { Project } from "@prisma/client";
import ProjectCard from "@/components/ProjectCard";

interface ProjectsSectionProps {
  projects: Project[];
}

const ProjectsSection: FC<ProjectsSectionProps> = ({ projects }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  return (
    <section className="flex flex-col gap-8">
      <Input
        type="search"
        placeholder="search projects..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects
          .filter((val) => {
            if (searchTerm === "") {
              return val;
            } else if (
              val.name.toLowerCase().includes(searchTerm.toLowerCase())
            ) {
              return val;
            }
          })
          .map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
      </section>
    </section>
  );
};

export default ProjectsSection;
