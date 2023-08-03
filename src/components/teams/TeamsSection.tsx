"use client";

import { FC, useState } from "react";
import { Input } from "@/components/ui/input";
import { Team, TeamMember } from "@prisma/client";
import TeamCard from "@/components/teams/TeamCard";

interface TeamsSectionProps {
  teams: Team[];
  // members: TeamMember[];
}

const TeamsSection: FC<TeamsSectionProps> = ({ teams }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  return (
    <section className="flex flex-col gap-8">
      <Input
        type="search"
        placeholder="search projects..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {teams
          .filter((val) => {
            if (searchTerm === "") {
              return val;
            } else if (
              val.name.toLowerCase().includes(searchTerm.toLowerCase())
            ) {
              return val;
            }
          })
          .map((team) => (
            <TeamCard key={team.id} {...team} membersCount={2} />
          ))}
      </section>
    </section>
  );
};

export default TeamsSection;
