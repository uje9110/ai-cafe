import { ProductWithTags } from "@/types/product";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { createContext, ReactNode, useContext } from "react";

type FavoriteItemSectionContextProps = {
  products?: ProductWithTags[];
};

const FavoriteItemSectionContext =
  createContext<FavoriteItemSectionContextProps | null>(null);

export const FavoriteItemSectionProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { data: products } = useQuery<ProductWithTags[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axios.get("/api/products");
      if (!res.status) throw new Error("Failed to fetch products");
      return res.data;
    },
  });
  return (
    <FavoriteItemSectionContext.Provider value={{ products }}>
      {children}
    </FavoriteItemSectionContext.Provider>
  );
};

export const useFavoriteItemSection = () => {
  const context = useContext(FavoriteItemSectionContext);
  if (!context)
    throw new Error(
      "useFavoriteItemSection can be used only in FavoriteItemSectionProvider",
    );
  return context;
};
