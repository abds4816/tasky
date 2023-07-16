import { PricingItem } from "@/types/intefaces";
import { FC } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "./ui/button";

interface PricingCardProps extends PricingItem {}

const PricingCard: FC<PricingCardProps> = ({
  title,
  description,
  features,
  monthlyPrice,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <ul className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            {features.map((feature, index) => (
              <li
                key={index}
                className="flex gap-2 items-center whitespace-nowrap text-muted-foreground"
              >
                <Check className="w-4 h-4" />
                {feature}
              </li>
            ))}
          </ul>
          <div className="flex flex-col items-center gap-4">
            <h1 className="text-7xl font-extrabold">${monthlyPrice}</h1>
            <small className="text-lg font-medium text-muted-foreground capitalize">
              billed monthly
            </small>
            <Link href="/login" className={buttonVariants({ size: "lg" })}>
              get started
            </Link>
          </div>
        </CardContent>
      </CardHeader>
    </Card>
  );
};

export default PricingCard;
