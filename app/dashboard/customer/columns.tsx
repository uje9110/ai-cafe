"use client";

import { Customer } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";
import { useCustomer } from "./useCustomer";
import { useCustomerDialog } from "./CustomerDialog/useCustomerDialog";
import { CustomerWithFavoriteInterest } from "@/types/customer";
import { Badge } from "@/components/ui/badge";

export const getCustomersColumns =
  (): ColumnDef<CustomerWithFavoriteInterest>[] => {
    const { deleteCustomer } = useCustomer();
    const { setOpen, setCustomerData } = useCustomerDialog();
    return [
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "email",
        header: "Email",
      },
      {
        accessorKey: "favoriteItems",
        header: "Favorite Items",
        cell: ({ row }) => {
          const favorite = row.original.favorites;
          return (
            <div className="flex items-center justify-start gap-1">
              {favorite.map((f) => {
                return (
                  <Badge
                    key={f.productId}
                    variant="secondary"
                    className="cursor-pointer py-1 rounded-sm border border-slate-300"
                  >
                    {f.product.name}
                  </Badge>
                );
              })}
            </div>
          );
        },
      },
      {
        accessorKey: "interest",
        header: "Interest",
        cell: ({ row }) => {
          const favorite = row.original.interests;
          return (
            <div className="flex items-center justify-start gap-1">
              {favorite.map((i) => {
                return (
                  <Badge
                    key={i.tagId}
                    variant="secondary"
                    className="cursor-pointer py-1 rounded-sm border border-slate-300"
                  >
                    {i.tag.name}
                  </Badge>
                );
              })}
            </div>
          );
        },
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          const customer = row.original;
          const editedCustomer = {
            id: customer.id,
            email: customer.email,
            name: customer.name,
            favoriteItems: customer.favorites.map((fp) => fp.productId),
          };

          return (
            <div className="flex items-center gap-2">
              <Button
                size="icon"
                className="bg-green-400 hover:bg-green-500"
                onClick={() => {
                  setOpen(true);
                  setCustomerData(editedCustomer);
                }}
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                variant="destructive"
                size="icon"
                onClick={() => {
                  deleteCustomer(customer.id);
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
