"use client";

import { Table } from "@tanstack/react-table";

import { Input } from "@/components/ui/input";
import AddEntityModal from "@/components/AddEntityModal";
import { ViewOptions } from "./ViewOptions";
import { TeamMember } from "@prisma/client";
import AddTaskForm from "./AddTaskForm";

interface ToolbarProps<TData> {
  table: Table<TData>;
  members: TeamMember[] | undefined;
}

export function Toolbar<TData>({ table, members }: ToolbarProps<TData>) {
  return (
    <div className="flex items-center justify-between gap-2 py-4 md:py-8">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          type="search"
          placeholder="Filter tasks..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="max-w-lg"
        />
      </div>
      <div className="flex items-center gap-2">
        <ViewOptions table={table} />
        <AddEntityModal
          entity="task"
          form={<AddTaskForm teamMembers={members} />}
          ButtonVariant="default"
        />
      </div>
    </div>
  );
}
