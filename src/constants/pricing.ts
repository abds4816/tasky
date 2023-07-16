import { PricingItem } from "@/types/intefaces";

export const pricingItems: PricingItem[] = [
  {
    title: "FREE plan",
    description: "The essentials to provide your best work for your clients.",
    features: [
      "10 projects",
      "Up to 50 tasks",
      "basic analytics",
      "basic support",
    ],
    monthlyPrice: 0,
  },
  {
    title: "PRO plan",
    description: "A plan that scales with your rapidly growing business.",
    features: [
      "unlimited projects",
      "unlimited tasks",
      "advanced analytics",
      "premium support",
    ],
    monthlyPrice: 19,
  },
];
