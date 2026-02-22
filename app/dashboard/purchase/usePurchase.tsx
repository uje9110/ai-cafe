"use client";

import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Purchase } from "@prisma/client";

export function usePurchase() {
  const queryClient = useQueryClient();

  const { mutateAsync: deletePurchase } = useMutation<Purchase, Error, string>({
    mutationFn: async (id: string) => {
      const res = await axios.delete(`/api/purchases/${id}`);
      if (res.status !== 200) {
        throw new Error("Failed to delete purchase");
      }
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["purchases"] });
    },
  });

  return { deletePurchase };
}
