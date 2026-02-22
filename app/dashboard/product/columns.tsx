"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";
import { ProductWithTags } from "@/types/product";
import { useProductDialog } from "./ProductDialog/useProductDialog";
import { useProduct } from "./useProduct";

export const getProductColumns = (): ColumnDef<ProductWithTags>[] => {
  const { setOpen, setProductData } = useProductDialog();
  const { deleteProduct } = useProduct();

  return [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "price",
      header: "Price",
    },
    {
      id: "tags",
      header: "Tags",
      cell: ({ row }) => {
        const tags = row.original.tags;

        return (
          <div className="flex gap-2 flex-wrap">
            {tags.map((t) => (
              <span
                key={t.tag.id}
                className="px-2 py-1 text-xs rounded bg-muted"
              >
                {t.tag.name}
              </span>
            ))}
          </div>
        );
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const product = row.original;
        const editedProduct = {
          id: product.id,
          name: product.name,
          price: product.price,
          tagIds: product.tags.map((t) => t.tagId),
        };

        return (
          <div className="flex items-center gap-2">
            <Button
              size="icon"
              className="bg-green-400 hover:bg-green-500"
              onClick={() => {
                setOpen(true);
                setProductData(editedProduct);
              }}
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="destructive"
              size="icon"
              onClick={() => {
                deleteProduct(product.id);
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
