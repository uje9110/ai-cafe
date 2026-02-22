"use client";

import { FC } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { useFavoriteItemSection } from "./useFavoriteItemSection";

type FavoriteItemSectionProps = {
  isProductExist: (id: string) => boolean;
  handleProductToggle: (id: string) => void;
};

const FavoriteItemSection: FC<FavoriteItemSectionProps> = ({
  isProductExist,
  handleProductToggle,
}) => {
  const { products } = useFavoriteItemSection();

  if (!products) return null;

  const selectedProducts = products.filter((p) => isProductExist(p.id));

  return (
    <div className=" flex flex-col gap-2">
      <label className="text-sm font-medium">Favorite Products</label>

      {/* Selected Badges */}
      {selectedProducts.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedProducts.map((product) => (
            <Badge
              key={product.id}
              variant="secondary"
              className="cursor-pointer py-1 rounded-sm border border-slate-300 hover:bg-red-200"
              onClick={() => handleProductToggle(product.id)}
            >
              {product.name}
            </Badge>
          ))}
        </div>
      )}

      {/* Popover */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className="w-full justify-between"
          >
            {selectedProducts.length > 0
              ? `${selectedProducts.length} selected`
              : "Select products"}
            <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Search favorite product..." />
            <CommandEmpty>No product found.</CommandEmpty>
            <CommandGroup className="max-h-64 overflow-auto">
              {products.map((product) => {
                const selected = isProductExist(product.id);

                return (
                  <CommandItem
                    key={product.id}
                    onSelect={() => handleProductToggle(product.id)}
                    className="flex items-center justify-between"
                  >
                    {product.name}
                    <Check
                      className={cn(
                        "h-4 w-4",
                        selected ? "opacity-100" : "opacity-0",
                      )}
                    />
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default FavoriteItemSection;
