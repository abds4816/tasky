import { FC } from "react";

interface ProjectPageProps {
  params: {
    projectId: string;
  };
}

const page: FC<ProjectPageProps> = async ({ params }) => {
  return <div>{params.projectId}</div>;
};

export default page;
