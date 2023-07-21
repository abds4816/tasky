"use client";

import { FC } from "react";
import ChartCard from "@/components/ChartCard";

interface DashboardOverviewProps {
  data: any;
}

const DashboardOverview: FC<DashboardOverviewProps> = ({ data }) => {
  return (
    <ChartCard
      title="Overview"
      description="Your team complete 43 tasks this week"
      className="col-span-12 lg:col-span-7"
    >
      <p>test</p>
    </ChartCard>
  );
};

export default DashboardOverview;
