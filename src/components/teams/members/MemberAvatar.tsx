import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TeamMember } from "@prisma/client";
import { FC } from "react";

interface MemberAvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  member: Pick<TeamMember, "name" | "imageUrl">;
}

const MemberAvatar: FC<MemberAvatarProps> = ({
  member,
  className,
  ...props
}) => {
  return (
    <Avatar className={className} {...props}>
      {member.imageUrl ? (
        <AvatarImage src={member.imageUrl!} alt={member.name} />
      ) : (
        <AvatarFallback>{member.name.slice(0, 1).toLowerCase()}</AvatarFallback>
      )}
    </Avatar>
  );
};

export default MemberAvatar;
