import { Project } from "@prisma/client";
import { FC } from "react";
import DeleteEntityCard from "@/components/DeleteEntityCard";
import DeleteProject from "@/components/project/DeleteProject";
import SettingsCard from "@/components/SettingsCard";
import UpdateProjectName from "../UpdateProjectName";
import CopyProjectId from "../CopyProjectId";

interface ProjectSettingsProps {
  project: Project | undefined;
}

const ProjectSettings: FC<ProjectSettingsProps> = ({ project }) => {
  return (
    <section className="flex flex-col gap-8">
      <SettingsCard
        title="project name"
        description="Used to identify your Project on the projects page."
        className="mt-8"
      >
        <UpdateProjectName id={project?.id} name={project?.name} />
      </SettingsCard>
      <SettingsCard
        title="project ID"
        description="Used when interacting with the Tasky API."
      >
        <CopyProjectId id={project?.id} />
      </SettingsCard>
      <DeleteEntityCard
        entity="project"
        form={<DeleteProject projectId={project?.id} />}
        description="The project will be permanently deleted, including its tasks. This action is irreversible and can not be undone."
      />
    </section>
  );
};

export default ProjectSettings;
