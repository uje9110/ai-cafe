"use client";

import { useState } from "react";
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { CustomerWithFavoriteInterest } from "@/types/customer";

interface Props {
  customers: CustomerWithFavoriteInterest[];
  value: CustomerWithFavoriteInterest | null;
  onChange: (customer: CustomerWithFavoriteInterest) => void;
}

export function CustomerSelect({
  customers,
  value,
  onChange,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-between"
        >
          {value ? value.name : "Select customer"}
          <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search customer..." />
          <CommandList>
            {customers.map((customer) => (
              <CommandItem
                key={customer.id}
                value={customer.name}
                onSelect={() => {
                  onChange(customer);
                  setOpen(false);
                }}
              >
                <Check
                  className={`mr-2 h-4 w-4 ${
                    value?.id === customer.id
                      ? "opacity-100"
                      : "opacity-0"
                  }`}
                />
                {customer.name} ({customer.email ?? "—"})
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}