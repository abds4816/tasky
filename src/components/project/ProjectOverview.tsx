import { Project } from "@prisma/client";
import { FC } from "react";

interface ProjectOverviewProps {
  project: Project | null | undefined;
}

const ProjectOverview: FC<ProjectOverviewProps> = async ({ project }) => {
  return <div>ProjectOverview</div>;
};

export default ProjectOverview;
