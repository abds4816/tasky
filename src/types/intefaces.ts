import { ReactNode } from "react";

export interface INavLink {
  title: string;
  href: string;
}

export interface IStatistic {
  title: string;
  icon: ReactNode;
  value: number;
  percentageChange: number | string;
  description: string;
  unit: string;
}

export interface Entity {
  entity: "project" | "task";
  form: ReactNode;
}

export interface PricingItem {
  title: string;
  description: string;
  monthlyPrice: number;
  features: string[];
}
