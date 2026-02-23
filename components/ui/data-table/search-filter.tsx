"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/useDebouce";
import { Search } from "lucide-react";

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
    <div className="space-y-2 w-full md:w-64 relative">
      <Input
        value={inputValue}
        placeholder={`Search ${filterName}...`}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <Search size={18} className="absolute top-2 right-2 text-slate-400" />
    </div>
  );
};
