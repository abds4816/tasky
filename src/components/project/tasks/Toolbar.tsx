"use client";

import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AddEntityModal from "@/components/AddEntityModal";
import AddTaskForm from "@/components/project/tasks/TaskForm";
import { ViewOptions } from "./ViewOptions";
// import { DataTableViewOptions } from "@/app/examples/tasks/components/data-table-view-options"

interface ToolbarProps<TData> {
  table: Table<TData>;
}

export function Toolbar<TData>({ table }: ToolbarProps<TData>) {
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
        {/* <AddEntityModal
          entity="task"
          form={<AddTaskForm teamMembers={} mode="create" />}
          ButtonVariant="default"
        /> */}
      </div>
    </div>
  );
}
