import { Project } from "@prisma/client";
import { FC } from "react";
import DeleteEntityCard from "../DeleteEntityCard";
import DeleteProject from "../DeleteProject";

interface ProjectSettingsProps {
  project: Project | null | undefined;
}

const ProjectSettings: FC<ProjectSettingsProps> = ({ project }) => {
  return (
    <section className="flex flex-col gap-8">
      <DeleteEntityCard
        entity="project"
        form={<DeleteProject projectId={project?.id} />}
        description="The project will be permanently deleted, including its tasks. This action is irreversible and can not be undone."
      />
    </section>
  );
};

export default ProjectSettings;
