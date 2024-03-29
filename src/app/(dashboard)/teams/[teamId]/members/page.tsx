import { getTeamById } from "@/actions/getTeamById";
import AddEntityModal from "@/components/AddEntityModal";
import { DataTable } from "@/components/data-table/DataTable";
import TeamLayout from "@/components/teams/TeamLayout";
import { memberColumns } from "@/components/teams/members/MemberColumns";
import {
  EmptyState,
  EmptyStateActions,
  EmptyStateContent,
  EmptyStateDescription,
  EmptyStateIcon,
  EmptyStateTitle,
} from "@/components/ui/empty-state";
import { User } from "lucide-react";
import { notFound } from "next/navigation";
import { FC } from "react";
import AddMembersForm from "@/components/teams/members/AddMembersForm";

interface pageProps {
  params: { teamId: string };
}

export const metadata = {
  title: "Members | Tasky",
  description: "Generated by create next app",
};

const page: FC<pageProps> = async ({ params }) => {
  const team = await getTeamById(params.teamId);
  if (!team) {
    notFound();
  }
  return (
    <TeamLayout Team={team} activeTab="members">
      {!team.members.length ? (
        <EmptyState>
          <EmptyStateContent>
            <EmptyStateIcon>
              <User className="w-10 h-10" />
            </EmptyStateIcon>
            <EmptyStateTitle>No members added</EmptyStateTitle>
            <EmptyStateDescription>
              You have not added any members. Add one below.
            </EmptyStateDescription>
            <EmptyStateActions>
              <AddEntityModal entity="member" form={<AddMembersForm />} />
            </EmptyStateActions>
          </EmptyStateContent>
        </EmptyState>
      ) : (
        <DataTable
          columns={memberColumns}
          data={team.members}
          form={<AddMembersForm />}
          entity="member"
          searchColumn="name"
        />
      )}
    </TeamLayout>
  );
};

export default page;
