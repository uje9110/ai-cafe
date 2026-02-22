"use client";
import PurchaseForm from "./PurchaseForm/PurchaseForm";
import { ProductWithTags } from "@/types/product";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { CustomerWithFavoriteInterest } from "@/types/customer";
import { TagProvider } from "../product/DialogTagSection/useDialogTagSection";
import PurchaseDataTable from "./PurchaseDataTable";

const Page = () => {
  const { data: products } = useQuery<ProductWithTags[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axios.get("/api/products");
      if (!res.status) throw new Error("Failed to fetch products");
      return res.data;
    },
  });

  const { data: customers } = useQuery<CustomerWithFavoriteInterest[]>({
    queryKey: ["customers"],
    queryFn: async () => {
      const res = await axios.get(`/api/customers`);
      return res.data;
    },
  });

  if (!customers || !products) return <p>Loading...</p>;

  return (
    <TagProvider>
      <div className="w-full flex flex-col gap-2 py-5 px-4">
        <PurchaseForm customers={customers} products={products} />
        <PurchaseDataTable />
      </div>
    </TagProvider>
  );
};

export default Page;
