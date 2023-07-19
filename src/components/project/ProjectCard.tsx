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
import { formatDate } from "@/lib/utils";

interface ProjectCardProps extends Project {}

const ProjectCard: FC<ProjectCardProps> = ({
  id,
  name,
  description,
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
          <p>{formatDate(createdAt.toLocaleString())}</p>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ProjectCard;