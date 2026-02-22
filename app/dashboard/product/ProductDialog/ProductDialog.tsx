import {
  DialogTrigger,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import DialogTagSection from "../DialogTagSection/DialogTagSection";
import { useProductDialog } from "./useProductDialog";
import { Plus } from "lucide-react";

type ProductDialogProps = {
  mode: "create" | "edit";
};

export const ProductDialog = ({ mode }: ProductDialogProps) => {
  const {
    open,
    setOpen,
    productData,
    handleInputChange,
    handleSubmit,
    handleTagToggle,
    isTagExist,
  } = useProductDialog();

  const isEdit = mode === "edit";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {!isEdit && (
        <DialogTrigger asChild>
          <Button className="w-full">
            <Plus />
            <span>Add Product</span>
          </Button>
        </DialogTrigger>
      )}

      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Edit Product" : "Create Product"}
          </DialogTitle>
          <DialogDescription>
            Fill in the required information below.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Name *</Label>
            <Input
              name="name"
              value={productData?.name ?? ""}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Price *</Label>
            <Input
              name="price"
              type="number"
              value={productData?.price ?? ""}
              onChange={handleInputChange}
              required
            />
          </div>

          <DialogTagSection
            handleTagToggle={handleTagToggle}
            isTagExist={isTagExist}
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
