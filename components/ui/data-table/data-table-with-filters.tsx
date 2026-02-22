import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./data-table";
import { DataTableFilters, DataTableFiltersType } from "./data-table-filter";

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
    <div className="space-y-4">
      <DataTableFilters
        filters={filters}
        setFilters={setFilters}
        filtersConfig={filtersConfig}
      />
      <DataTable columns={columns} data={data} />
    </div>
  );
}