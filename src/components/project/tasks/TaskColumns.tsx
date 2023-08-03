"use client";

import { Task } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { ColumnHeader } from "@/components/data-table/ColumnHeader";
import { Checkbox } from "@/components/ui/checkbox";

import TaskActions from "@/components/project/tasks/TaskActions";

export const taskColumns: ColumnDef<Task>[] = [
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
    accessorKey: "title",
    header: ({ column }) => <ColumnHeader column={column} title="Title" />,
  },
  {
    accessorKey: "status",
    header: ({ column }) => <ColumnHeader column={column} title="Status" />,
  },
  {
    accessorKey: "priority",
    header: ({ column }) => <ColumnHeader column={column} title="Priority" />,
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return <TaskActions task={row.original} />;
    },
  },
];
