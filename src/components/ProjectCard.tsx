import { Project } from "@prisma/client";
import { FC } from "react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

interface ProjectCardProps extends Project {}

const ProjectCard: FC<ProjectCardProps> = ({
  id,
  name,
  description,
  userId,
  createdAt,
  updatedAt,
}) => {
  return (
    <Link href={`/projects/${id}`}>
      <Card className="h-full">
        <CardHeader>
          <CardTitle>{name}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardFooter>
          <p>{new Date(createdAt).getDay()}</p>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ProjectCard;
