"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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
      cell: ({ row }) => {
        const value = row.original.segment;

        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="max-w-40 truncate cursor-pointer">{value}</div>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs wrap-break-words">
                {value}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      },
    },
    {
      accessorKey: "whyNow",
      header: "Why Now",
      cell: ({ row }) => {
        const value = row.original.whyNow;

        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="max-w-40 truncate cursor-pointer">{value}</div>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs wrap-break-words">
                {value}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      },
    },
    {
      accessorKey: "message",
      header: "Message",
      cell: ({ row }) => {
        const value = row.original.message;

        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="max-w-40 truncate cursor-pointer">{value}</div>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs wrap-break-words">
                {value}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
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
