"use client";

import { Table } from "@tanstack/react-table";

import { Input } from "@/components/ui/input";
import AddEntityModal from "@/components/AddEntityModal";
import { ViewOptions } from "@/components/data-table/ViewOptions";
import { ReactNode } from "react";

interface ToolbarProps<TData> {
  table: Table<TData>;
  form: ReactNode;
  entity: "task" | "member";
  searchColumn: string;
}

export function Toolbar<TData>({
  table,
  form,
  entity,
  searchColumn,
}: ToolbarProps<TData>) {
  return (
    <div className="flex items-center justify-between gap-2 py-4 md:py-8">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          type="search"
          placeholder={`Filter ${entity}s by ${searchColumn}...`}
          value={
            (table.getColumn(searchColumn)?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn(searchColumn)?.setFilterValue(event.target.value)
          }
          className="max-w-lg"
        />
      </div>
      <div className="flex items-center gap-2">
        <ViewOptions table={table} />
        <AddEntityModal entity={entity} form={form} ButtonVariant="default" />
      </div>
    </div>
  );
}
