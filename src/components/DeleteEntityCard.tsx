import { Entity } from "@/types/intefaces";
import { FC } from "react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface DeleteEntityCardProps extends Entity {
  description?: string;
}

const DeleteEntityCard: FC<DeleteEntityCardProps> = ({
  entity,
  form,
  description,
}) => {
  return (
    <Card className="border border-destructive">
      <CardHeader>
        <CardTitle className="capitalize">delete {entity}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <Separator />
      <CardFooter className="flex justify-end py-2">{form}</CardFooter>
    </Card>
  );
};

export default DeleteEntityCard;
