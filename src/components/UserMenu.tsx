import { FC } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "next-auth";
import { Avatar, AvatarImage } from "./ui/avatar";
import SignOutButton from "./SignOutButton";
import Link from "next/link";
import { Folders, LayoutDashboard, Settings } from "lucide-react";

interface UserMenuProps {
  user: User;
}

const UserMenu: FC<UserMenuProps> = ({ user }) => {
  const { name, image, email } = user;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={image!} alt={name!} />
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="flex flex-col gap-y-1">
          <h4>{name}</h4>
          <p className="font-normal">{email}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href="/dashboard">
          <DropdownMenuItem>
            <LayoutDashboard className="w-4 h-4 mr-2" />
            Dashboard
          </DropdownMenuItem>
        </Link>
        <Link href="/projects">
          <DropdownMenuItem>
            <Folders className="w-4 h-4 mr-2" />
            projects
          </DropdownMenuItem>
        </Link>
        <Link href="/settings">
          <DropdownMenuItem>
            <Settings className="w-4 h-4 mr-2" />
            settings
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <SignOutButton />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
