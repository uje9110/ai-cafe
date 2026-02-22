import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCustomerDialog } from "./useCustomerDialog";
import FavoriteItemSection from "../FavoriteItemSection/FavoriteItemSection";
import { Plus } from "lucide-react";

type CustomerDialogProps = {
  mode: "edit" | "create";
};

export const CustomerDialog = ({ mode }: CustomerDialogProps) => {
  const {
    open,
    setOpen,
    handleSubmit,
    handleInputChange,
    customerData,
    handleProductToggle,
    isProductExist,
  } = useCustomerDialog();

  const isEdit = mode === "edit";
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {!isEdit && (
        <DialogTrigger asChild>
          <Button className="w-full">
            <Plus />
            <span>Add Customer</span>
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Edit Customer" : "Create Customer"}
          </DialogTitle>
          <DialogDescription>
            Fill in the required information below.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              name="name"
              placeholder="John Doe"
              value={customerData?.name as string}
              onChange={(e) => handleInputChange(e)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="john@example.com"
              value={customerData?.email as string}
              onChange={(e) => handleInputChange(e)}
              required
            />
          </div>

          <FavoriteItemSection
            handleProductToggle={handleProductToggle}
            isProductExist={isProductExist}
          />

          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">{isEdit ? "Save Changes" : "Create"}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
