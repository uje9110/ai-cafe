import { Dispatch, SetStateAction, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import { Button } from "../button";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../command";
import { cn } from "@/lib/utils";

export const SelectFilter = ({
  filterName,
  value,
  options,
  setFilters,
}: {
  filterName: string;
  value: string;
  options: string[];
  setFilters: Dispatch<SetStateAction<Record<string, string>>>;
}) => {
  const [open, setOpen] = useState(false);
  const selectedLabel = options.find((opt) => opt === value);

  return (
    <div className="space-y-2 w-full md:w-64">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className="w-full justify-between"
          >
            {selectedLabel ?? `Select ${filterName}`}
            <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder={`Search ${filterName}...`} />
            <CommandEmpty>No option found.</CommandEmpty>

            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option}
                  value={option}
                  onSelect={() => {
                    setFilters((prev) => ({
                      ...prev,
                      [filterName]: option,
                    }));
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === option ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {option}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};
