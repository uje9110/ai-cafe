"use client";

import { useState } from "react";
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
  return (
    <div className="flex flex-wrap gap-4">
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
