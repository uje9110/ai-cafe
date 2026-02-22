"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { PromoWithDateAndId } from "@/types/promo";

export const getPromoColumns = ({
  deletePromo,
}: {
  deletePromo: (id: string) => void;
}): ColumnDef<PromoWithDateAndId>[] => {
  return [
    {
      accessorKey: "theme",
      header: "Theme",
    },
    {
      accessorKey: "segment",
      header: "Segment",
    },
    {
      accessorKey: "whyNow",
      header: "Why Now",
      cell: ({ row }) => {
        return <div className="max-w-62.5 truncate">{row.original.whyNow}</div>;
      },
    },
    {
      accessorKey: "message",
      header: "Message",
      cell: ({ row }) => {
        return (
          <div className="max-w-62.5 truncate">{row.original.message}</div>
        );
      },
    },
    {
      accessorKey: "bestTimeWindow",
      header: "Best Time Window",
      cell: ({ row }) => {
        return row.original.bestTimeWindow ?? "-";
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
        const promo = row.original;

        return (
          <div className="flex items-center gap-2">
            <Button
              variant="destructive"
              size="icon"
              onClick={() => {
                deletePromo(promo.id);
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
