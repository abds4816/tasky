"use client";

import { TeamMember } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { ColumnHeader } from "@/components/data-table/ColumnHeader";
import { Checkbox } from "@/components/ui/checkbox";
import MemberActions from "@/components/teams/members/MemberActions";
import MemberAvatar from "@/components/teams/members/MemberAvatar";

export const memberColumns: ColumnDef<TeamMember>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "imageUrl",
    header: "Image",
    cell: ({ row }) => (
      <MemberAvatar member={row.original} className="w-8 h-8" />
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => <ColumnHeader column={column} title="Name" />,
  },
  {
    accessorKey: "email",
    header: ({ column }) => <ColumnHeader column={column} title="Email" />,
  },
  {
    accessorKey: "role",
    header: ({ column }) => <ColumnHeader column={column} title="Role" />,
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return <MemberActions member={row.original} />;
    },
  },
];
