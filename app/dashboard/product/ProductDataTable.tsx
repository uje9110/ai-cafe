import { getProductColumns } from "./columns";
import { useTag } from "./DialogTagSection/useDialogTagSection";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { DataTableFiltersType } from "@/components/ui/data-table/data-table-filter";
import { ProductWithTags } from "@/types/product";
import { DataTableWithFilters } from "@/components/ui/data-table/data-table-with-filters";
import { useProductDialog } from "./ProductDialog/useProductDialog";
import { useProduct } from "./useProduct";

const ProductDataTable = () => {
  const { setOpen, setProductData } = useProductDialog();
  const { deleteProduct } = useProduct();

  const columns = getProductColumns({ setOpen, setProductData, deleteProduct });

  const { tags } = useTag();

  const [filters, setFilters] = useState<Record<string, string>>({});

  const { data: products } = useQuery<ProductWithTags[]>({
    queryKey: ["products", filters],
    queryFn: async () => {
      const res = await axios.get("/api/products", { params: filters });
      if (!res.status) throw new Error("Failed to fetch products");
      return res.data;
    },
  });

  if (!products || !tags) return <p>Loading...</p>;

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
      data={products}
      filters={filters}
      setFilters={setFilters}
      filtersConfig={filterConfig}
    />
  );
};

export default ProductDataTable;
