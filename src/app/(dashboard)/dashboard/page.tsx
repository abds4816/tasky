import PageHeader from "@/components/PageHeader";
import StatisticCard from "@/components/StatisticCard";
import { Card } from "@/components/ui/card";
import { statistics } from "@/constants/statistics";

export default async function dashboard() {
  return (
    <div className="flex flex-col gap-y-6 md:gap-y-8">
      <PageHeader title="dashboard" />
      {/* staistics cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statistics.map((statistic, index) => (
          <StatisticCard key={index} {...statistic} />
        ))}
      </section>
      {/* staistics cards */}

      <section className="grid grid-cols-12 gap-4">
        <Card className="h-20 col-span-12 lg:col-span-7"></Card>
        <Card className="h-20 col-span-12 lg:col-span-5"></Card>
      </section>
    </div>
  );
}
