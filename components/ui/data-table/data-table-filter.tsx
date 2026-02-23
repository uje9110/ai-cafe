"use client";

import { X } from "lucide-react";
import { Button } from "../button";
import { SearchFilter } from "./search-filter";
import { SelectFilter } from "./select-filter";

export type DataTableFiltersType = {
  filterName: string;
  filterType: "search" | "select";
  filterValues?: string[];
};

type DataTableFiltersProps = {
  filtersConfig: DataTableFiltersType[];
  filters: Record<string, string>;
  setFilters: React.Dispatch<React.SetStateAction<Record<string, string>>>;
};

export const DataTableFilters = ({
  filtersConfig,
  filters,
  setFilters,
}: DataTableFiltersProps) => {
  const clearFilters = () => {
    const cleared: Record<string, string> = {};
    filtersConfig.forEach((f) => {
      cleared[f.filterName] = "";
    });
    setFilters(cleared);
  };

  return (
    <div className="flex flex-wrap gap-4">
      {/* Clear filter */}
      <Button
        variant="ghost"
        size="sm"
        onClick={clearFilters}
        className="text-muted-foreground h-9 flex items-center justify-center border"
      >
        <X size={18} />
        <span>Clear</span>
      </Button>

      {filtersConfig.map((filter) => {
        const value = filters[filter.filterName] ?? "";

        if (filter.filterType === "search") {
          return (
            <SearchFilter
              key={filter.filterName}
              filterName={filter.filterName}
              value={value}
              setFilters={setFilters}
            />
          );
        }

        if (filter.filterType === "select" && filter.filterValues) {
          return (
            <SelectFilter
              key={filter.filterName}
              filterName={filter.filterName}
              value={value}
              options={filter.filterValues}
              setFilters={setFilters}
            />
          );
        }

        return null;
      })}
    </div>
  );
};
