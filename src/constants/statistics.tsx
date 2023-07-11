import { IStatistic } from "@/types/intefaces";
import { Check, Folders, Users } from "lucide-react";

export const statistics: IStatistic[] = [
  {
    title: "Total projects",
    icon: <Folders />,
    value: 4,
    percentageChange: "+33.33%",
    description: "+180.1% from last month",
  },
  {
    title: "completed tasks",
    icon: <Check />,
    value: 25,
    percentageChange: "-12%",
    description: "+20.1% from last month",
  },
  {
    title: "Total teams",
    icon: <Users />,
    value: 2,
    percentageChange: "0%",
    description: "+19% from last month",
  },
  {
    title: "Total teams",
    icon: <Users />,
    value: 2,
    percentageChange: "0%",
    description: "+19% from last month",
  },
];
