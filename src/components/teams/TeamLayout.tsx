import { FC, ReactNode } from "react";
import PageHeader from "@/components/PageHeader";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { Team } from "@prisma/client";

interface TeamLayoutProps {
  Team: Team | undefined;
  children: ReactNode;
  activeTab: "overview" | "members" | "settings";
}

const TeamLayout: FC<TeamLayoutProps> = ({ Team, activeTab, children }) => {
  return (
    <div className="flex flex-col gap-y-6 md:gap-y-8">
      <PageHeader
        title={Team?.name}
        description="Here you can manage this team."
      />
      <Tabs defaultValue={activeTab}>
        <TabsList className="grid md:w-80 grid-cols-3 mb-4">
          <Link href={`/teams/${Team?.id}`} className="w-full">
            <TabsTrigger value="overview">Overview</TabsTrigger>
          </Link>
          <Link href={`/teams/${Team?.id}/members`} className="w-full">
            <TabsTrigger value="members">Members</TabsTrigger>
          </Link>
          <Link href={`/teams/${Team?.id}/settings`} className="w-full">
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </Link>
        </TabsList>
        {children}
      </Tabs>
    </div>
  );
};

export default TeamLayout;
