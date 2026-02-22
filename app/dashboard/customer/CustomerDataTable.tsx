import { getCustomersColumns } from "./columns";
import { useTag } from "../product/DialogTagSection/useDialogTagSection";
import { DataTableFiltersType } from "@/components/ui/data-table/data-table-filter";
import { DataTableWithFilters } from "@/components/ui/data-table/data-table-with-filters";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CustomerWithFavoriteInterest } from "@/types/customer";
import { useCustomerDialog } from "./CustomerDialog/useCustomerDialog";
import { useCustomer } from "./useCustomer";

export const CustomerDataTable = () => {
  const { deleteCustomer } = useCustomer();

  const { setOpen, setCustomerData } = useCustomerDialog();

  const columns = getCustomersColumns({
    deleteCustomer,
    setOpen,
    setCustomerData,
  });
  const { tags } = useTag();
  const [filters, setFilters] = useState<Record<string, string>>({});

  const { data: customers } = useQuery<CustomerWithFavoriteInterest[]>({
    queryKey: ["customers", filters],
    queryFn: async () => {
      const res = await axios.get(`/api/customers`, { params: filters });
      return res.data;
    },
  });

  if (!customers || !tags) return <p>Loading...</p>;

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
      data={customers}
      filters={filters}
      setFilters={setFilters}
      filtersConfig={filterConfig}
    />
  );
};
