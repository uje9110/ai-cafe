import axios from "axios";
import { Promo } from "@/types/promo";
import { useState } from "react";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const usePromo = () => {
  const [promos, setPromos] = useState<Promo[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedPromos, setSelectedPromos] = useState<Promo[]>([]);

  const generatePromo = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/api/ai/promo");
      setPromos(res.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to generate promo", {
        description: "Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const isPromoExist = (selectedPromo: Promo) => {
    return selectedPromos.some((sp) => sp.theme === selectedPromo.theme);
  };

  const toggleSelectedPromo = (selectedPromo: Promo) => {
    const promoExist = isPromoExist(selectedPromo);

    setSelectedPromos((prev) => {
      if (!promoExist) {
        return [...prev, selectedPromo];
      } else {
        return prev.filter((sp) => sp.theme !== selectedPromo.theme);
      }
    });
  };

  const queryClient = useQueryClient();

  const { mutateAsync: createPromos } = useMutation({
    mutationFn: async () => {
      console.log(123);

      const response = await axios.post("/api/promos", selectedPromos);
      return response.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["promos"] });
    },
  });

  const { mutate: deletePromo } = useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(`/api/promos/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["promos"] });
    },
  });

  return {
    promos,
    setPromos,
    loading,
    setLoading,
    generatePromo,
    selectedPromos,
    setSelectedPromos,
    isPromoExist,
    toggleSelectedPromo,
    createPromos,
    deletePromo,
  };
};

export default usePromo;
