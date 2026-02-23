import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./data-table";
import { DataTableFilters, DataTableFiltersType } from "./data-table-filter";
import { Separator } from "../separator";

type DataTableWithFiltersProps<TData> = {
  columns: ColumnDef<TData, unknown>[];
  data: TData[];
  filters: Record<string, string>;
  setFilters: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  filtersConfig: DataTableFiltersType[];
};

export function DataTableWithFilters<TData>({
  columns,
  data,
  filters,
  setFilters,
  filtersConfig,
}: DataTableWithFiltersProps<TData>) {
  return (
    <div className="flex flex-col gap-4 border-slate-400 rounded-md border p-4">
      <DataTableFilters
        filters={filters}
        setFilters={setFilters}
        filtersConfig={filtersConfig}
      />
      <Separator />
      <DataTable columns={columns} data={data} />
    </div>
  );
}