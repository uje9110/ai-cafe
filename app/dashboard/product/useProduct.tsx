"use client";

import axios from "axios";
import { Product } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useProduct() {
  const queryClient = useQueryClient();

  const { mutateAsync: deleteProduct } = useMutation<Product, Error, string>({
    mutationFn: async (id: string) => {
      const res = await axios.delete(`/api/products/${id}`);
      if (res.status !== 200) {
        throw new Error("Failed to delete product");
      }
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  return { deleteProduct };
}
