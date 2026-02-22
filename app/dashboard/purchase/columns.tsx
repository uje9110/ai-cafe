"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { PurchaseWithItems } from "@/types/purchase";

export const getPurchaseColumns = ({deletePurchase} : {deletePurchase : (id : string) => void}): ColumnDef<PurchaseWithItems>[] => {

  return [
    {
      id: "customer",
      header: "Customer",
      cell: ({ row }) => {
        return row.original.customer.name;
      },
    },
    {
      id: "items",
      header: "Items",
      cell: ({ row }) => {
        const items = row.original.items;

        return (
          <div className="flex flex-col gap-1">
            {items.map((item) => (
              <div key={item.id} className="text-sm">
                {item.product.name} × {item.quantity}
              </div>
            ))}
          </div>
        );
      },
    },
    {
      accessorKey: "total",
      header: "Total",
      cell: ({ row }) => {
        return `$${row.original.total}`;
      },
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ row }) => {
        return new Date(row.original.createdAt).toLocaleDateString();
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const purchase = row.original;
        return (
          <div className="flex items-center gap-2">
            <Button
              variant="destructive"
              size="icon"
              onClick={() => {
                deletePurchase(purchase.id);
              }}
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        );
      },
    },
  ];
};
