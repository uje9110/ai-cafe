import { ProductInputType } from "@/types/product";
import { Product } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {
  ChangeEvent,
  createContext,
  Dispatch,
  FormEvent,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

type ProductDialogMode = "create" | "edit";

type ProductDialogContextType = {
  mode: ProductDialogMode;

  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;

  productData: ProductInputType | null;
  setProductData: Dispatch<SetStateAction<ProductInputType | null>>;

  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleTagToggle: (tagId: string) => void;
  isTagExist: (tagId: string) => boolean;

  handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
};

const ProductDialogContext = createContext<ProductDialogContextType | null>(
  null,
);

export const ProductDialogProvider = ({
  children,
  mode,
}: {
  children: ReactNode;
  mode: ProductDialogMode;
}) => {
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);
  const [productData, setProductData] = useState<ProductInputType | null>(
    mode === "create" ? { name: "", price: 0, tagIds: [] } : null,
  );

  const mutation = useMutation<Product, Error, ProductInputType>({
    mutationFn: async (data) => {
      if (mode === "create") {
        const res = await axios.post("/api/products", data);
        return res.data;
      } else {
        const res = await axios.patch(`/api/products/${data.id}`, data);
        return res.data;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;

    setProductData((prev) => {
      if (!prev) return null;

      return {
        ...prev,
        [name]: name === "price" ? Number(value) : value,
      };
    });
  };

  const isTagExist = (tagId: string) => {
    if (!productData) return false;
    return productData.tagIds.includes(tagId);
  };

  const handleTagToggle = (tagId: string) => {
    setProductData((prev) => {
      if (!prev) return null;

      const exists = prev.tagIds.includes(tagId);

      return {
        ...prev,
        tagIds: exists
          ? prev.tagIds.filter((id) => id !== tagId)
          : [...prev.tagIds, tagId],
      };
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!productData) return;

    await mutation.mutateAsync(productData);

    setOpen(false);

    if (mode === "create") {
      setProductData({ name: "", price: 0, tagIds: [] });
    }
  };

  return (
    <ProductDialogContext.Provider
      value={{
        mode,
        open,
        setOpen,
        productData,
        setProductData,
        handleInputChange,
        handleTagToggle,
        isTagExist,
        handleSubmit,
      }}
    >
      {children}
    </ProductDialogContext.Provider>
  );
};

export const useProductDialog = () => {
  const context = useContext(ProductDialogContext);
  if (!context) {
    throw new Error(
      "useProductDialog must be used inside productDialogProvider",
    );
  }
  return context;
};
