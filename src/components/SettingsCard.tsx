import { FC, HTMLAttributes, ReactNode } from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface SettingsCardProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  children: ReactNode;
}

const SettingsCard: FC<SettingsCardProps> = ({
  title,
  description,
  children,
  className,
  ...props
}) => {
  return (
    <Card className={cn("border", className)} {...props}>
      <CardHeader>
        <CardTitle className="capitalize">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      {children}
    </Card>
  );
};

export default SettingsCard;
