import { CustomerInputType } from "@/types/customer";
import { Customer } from "@prisma/client";
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

type CustomerDialogMode = "create" | "edit";

type CustomerDialogContextType = {
  mode: CustomerDialogMode;

  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;

  customerData: CustomerInputType | null;
  setCustomerData: Dispatch<SetStateAction<CustomerInputType | null>>;

  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleProductToggle: (productId: string) => void;
  isProductExist: (productId: string) => boolean;

  handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
};

const CustomerDialogContext = createContext<CustomerDialogContextType | null>(
  null,
);

export const CustomerDialogProvider = ({
  children,
  mode,
}: {
  children: ReactNode;
  mode: CustomerDialogMode;
}) => {
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);
  const [customerData, setCustomerData] = useState<CustomerInputType | null>(
    mode === "create" ? { name: "", email: "", favoriteItems: [] } : null,
  );

  const mutation = useMutation<Customer, Error, CustomerInputType>({
    mutationFn: async (data) => {
      if (mode === "create") {
        const res = await axios.post("/api/customers", data);
        return res.data;
      } else {
        const res = await axios.patch(`/api/customers/${data.id}`, data);
        return res.data;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setCustomerData((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const isProductExist = (productId: string) => {
    if (!customerData || !customerData.favoriteItems) return false;
    return customerData.favoriteItems.includes(productId);
  };

  const handleProductToggle = (productId: string) => {
    setCustomerData((prev) => {
      if (!prev || !prev.favoriteItems) return null;

      const exists = prev.favoriteItems.includes(productId);

      return {
        ...prev,
        favoriteItems: exists
          ? prev.favoriteItems.filter((id) => id !== productId)
          : [...prev.favoriteItems, productId],
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!customerData) return;

    await mutation.mutateAsync(customerData);

    setOpen(false);

    if (mode === "create") {
      setCustomerData({ name: "", email: "", favoriteItems: [] });
    }
  };

  return (
    <CustomerDialogContext.Provider
      value={{
        mode,
        open,
        setOpen,
        customerData,
        setCustomerData,
        handleInputChange,
        isProductExist,
        handleProductToggle,
        handleSubmit,
      }}
    >
      {children}
    </CustomerDialogContext.Provider>
  );
};

export const useCustomerDialog = () => {
  const context = useContext(CustomerDialogContext);
  if (!context) {
    throw new Error(
      "useCustomerDialog must be used inside customerDialogProvider",
    );
  }
  return context;
};
