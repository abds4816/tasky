import { getTeamById } from "@/actions/getTeamById";
import DeleteEntityCard from "@/components/DeleteEntityCard";
import DeleteTeam from "@/components/teams/DeleteTeam";
import TeamLayout from "@/components/teams/TeamLayout";
import { notFound } from "next/navigation";
import { FC } from "react";

interface pageProps {
  params: {
    teamId: string;
  };
}

export const metadata = {
  title: "Team Settings | Tasky",
  description: "Generated by create next app",
};

const page: FC<pageProps> = async ({ params }) => {
  const team = await getTeamById(params.teamId);
  if (!team) {
    notFound();
  }
  return (
    <TeamLayout Team={team} activeTab="settings">
      <section>
        <DeleteEntityCard
          entity="team"
          form={<DeleteTeam teamId={team.id} />}
          description="The project will be permanently deleted, including its tasks. This action is irreversible and can not be undone."
        />
      </section>
    </TeamLayout>
  );
};

export default page;
