"use client";

import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/useDebouce";

type SearchFilterProps = {
  filterName: string;
  value: string;
  setFilters: React.Dispatch<React.SetStateAction<Record<string, string>>>;
};

export const SearchFilter = ({
  filterName,
  value,
  setFilters,
}: SearchFilterProps) => {
  const [inputValue, setInputValue] = useState(value);

  const debouncedValue = useDebounce(inputValue, 500); // 500ms delay

  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: debouncedValue,
    }));
  }, [debouncedValue, filterName, setFilters]);

  return (
    <div className="space-y-2 w-full md:w-64">
      <Label className="capitalize">{filterName}</Label>
      <Input
        value={inputValue}
        placeholder={`Search ${filterName}...`}
        onChange={(e) => setInputValue(e.target.value)}
      />
    </div>
  );
};
