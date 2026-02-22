import { CustomerWithFavoriteInterest } from "@/types/customer";
import { ProductWithTags } from "@/types/product";
import { useMemo, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

type PurchaseItem = {
  product?: ProductWithTags;
  quantity: number;
};

export function usePurchaseForm() {
  const [customer, setCustomer] = useState<CustomerWithFavoriteInterest | null>(
    null,
  );

  const [items, setItems] = useState<PurchaseItem[]>([]);

  /* -------------------- Item Handlers -------------------- */

  const addItem = () => {
    setItems((prev) => [...prev, { quantity: 1 }]);
  };

  const removeItem = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const updateProduct = (index: number, product: ProductWithTags) => {
    setItems((prev) => {
      const updated = [...prev];
      updated[index].product = product;
      return updated;
    });
  };

  const updateQuantity = (index: number, quantity: number) => {
    setItems((prev) => {
      const updated = [...prev];
      updated[index].quantity = quantity;
      return updated;
    });
  };

  const reset = () => {
    setCustomer(null);
    setItems([]);
  };

  /* -------------------- Computed JSON -------------------- */

  const computed = useMemo(() => {
    const formattedItems = items
      .filter((item) => item.product)
      .map((item) => {
        const subtotal = item.product!.price * item.quantity;

        return {
          name: item.product!.name,
          price: item.product!.price,
          quantity: item.quantity,
          subtotal,
        };
      });

    const total = formattedItems.reduce((acc, item) => acc + item.subtotal, 0);

    return {
      customer: customer
        ? {
            name: customer.name,
            email: customer.email ?? "",
          }
        : null,
      items: formattedItems,
      total,
    };
  }, [customer, items]);

  /* -------------------- Mutation -------------------- */
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async () => {
      if (!customer) {
        throw new Error("Customer is required");
      }

      if (computed.items.length === 0) {
        throw new Error("At least one item is required");
      }

      const response = await axios.post("/api/purchases", computed);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["purchases"], exact: false });
      reset();
    },
  });

  const handleSubmit = () => {
    mutation.mutate();
  };

  return {
    customer,
    items,
    setCustomer,
    addItem,
    removeItem,
    updateProduct,
    updateQuantity,
    computed,
    handleSubmit,
    isLoading: mutation.isPending,
    error: mutation.error,
    reset,
  };
}
