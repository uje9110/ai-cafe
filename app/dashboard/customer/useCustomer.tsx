"use client";

import axios from "axios";
import { Customer } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CustomerInputType } from "@/types/customer";

export function useCustomer() {
  const queryClient = useQueryClient();
  const { mutateAsync: createCustomer } = useMutation<
    Customer,
    Error,
    CustomerInputType
  >({
    mutationFn: async (data) => {
      const res = await axios.post("/api/customers", data);
      if (res.status !== 200) {
        throw new Error("Failed to create customer");
      }
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
  });

  const { mutateAsync: deleteCustomer } = useMutation<Customer, Error, string>({
    mutationFn: async (id: string) => {
      const res = await axios.delete(`/api/customers/${id}`);
      if (res.status !== 200) {
        throw new Error("Failed to delete customer");
      }
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
  });

  return { createCustomer, deleteCustomer };
}
