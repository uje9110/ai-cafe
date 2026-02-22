import { DataTableFiltersType } from "@/components/ui/data-table/data-table-filter";
import { DataTableWithFilters } from "@/components/ui/data-table/data-table-with-filters";
import { PurchaseWithItems } from "@/types/purchase";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { getPurchaseColumns } from "./columns";
import { useTag } from "../product/DialogTagSection/useDialogTagSection";
import { usePurchase } from "./usePurchase";

const PurchaseDataTable = () => {
  const { deletePurchase } = usePurchase();
  const columns = getPurchaseColumns({ deletePurchase });
  const { tags } = useTag();

  const [filters, setFilters] = useState<Record<string, string>>({});

  const { data: purchases } = useQuery<PurchaseWithItems[]>({
    queryKey: ["purchases", filters],
    queryFn: async () => {
      const res = await axios.get("/api/purchases", { params: filters });
      if (!res.status) throw new Error("Failed to fetch purchases");
      return res.data;
    },
  });

  if (!purchases || !tags) return <p>Loading...</p>;

  const filterConfig: DataTableFiltersType[] = [
    {
      filterName: "name",
      filterType: "search",
    },
    {
      filterName: "interest",
      filterType: "select",
      filterValues: tags.map((t) => t.name),
    },
  ];

  return (
    <DataTableWithFilters
      columns={columns}
      data={purchases}
      filters={filters}
      setFilters={setFilters}
      filtersConfig={filterConfig}
    />
  );
};

export default PurchaseDataTable;
