import { Team } from "@prisma/client";
import { FC } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { formatTimeToNow } from "@/lib/utils";

interface TeamCardProps extends Team {
  membersCount: number;
}

const TeamCard: FC<TeamCardProps> = ({
  id,
  name,
  createdAt,
  updatedAt,
  membersCount,
}) => {
  return (
    <Link href={`/teams/${id}`}>
      <Card className="h-full">
        <CardHeader>
          <CardTitle>{name}</CardTitle>
          <CardDescription>
            This team contains {membersCount} member(s)
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-start">
          {}
        </CardContent>
        <CardFooter>
          <p>{formatTimeToNow(new Date(createdAt))}</p>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default TeamCard;
