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
import { formatTimeToNow } from "@/lib/utils";

interface ProjectCardProps extends Project {}

const ProjectCard: FC<ProjectCardProps> = ({
  id,
  name,
  description,
  isCompleted,
  createdAt,
  updatedAt,
}) => {
  return (
    <Link href={`/projects/${id}`}>
      <Card className="h-full">
        <CardHeader>
          <CardTitle>{name}</CardTitle>
          <CardDescription>{`${description} ${isCompleted}`}</CardDescription>
        </CardHeader>
        <CardFooter className="flex-col items-start">
          <p>{formatTimeToNow(new Date(updatedAt))}</p>
          <p>{formatTimeToNow(new Date(createdAt))}</p>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ProjectCard;
