import PricingCard from "@/components/PricingCard";
import { pricingItems } from "@/constants/pricing";
import React from "react";

export default function pricing() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {pricingItems.map((item, index) => (
        <PricingCard key={index} {...item} />
      ))}
    </section>
  );
}
