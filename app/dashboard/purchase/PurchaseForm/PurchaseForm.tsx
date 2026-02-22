"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Plus } from "lucide-react";
import { CustomerSelect } from "./CustomerSelect";
import { ProductSelect } from "./ProductSelect";
import { usePurchaseForm } from "./usePurchaseForm";
import { CustomerWithFavoriteInterest } from "@/types/customer";
import { ProductWithTags } from "@/types/product";

interface Props {
  customers: CustomerWithFavoriteInterest[];
  products: ProductWithTags[];
}

export default function PurchaseDialog({ customers, products }: Props) {
  const [open, setOpen] = useState(false);

  const {
    customer,
    items,
    setCustomer,
    addItem,
    removeItem,
    updateProduct,
    updateQuantity,
    computed,
    handleSubmit,
  } = usePurchaseForm();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Trigger */}
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Create Purchase
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">
            Create Purchase
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-8 py-4 max-h-[70vh] overflow-y-auto">
          {/* Customer Section */}
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Customer</h3>
            <CustomerSelect
              customers={customers}
              value={customer}
              onChange={setCustomer}
            />
          </div>

          <Separator />

          {/* Items Section */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Items</h3>

              <Button size="sm" onClick={addItem} className="gap-2">
                <Plus className="h-4 w-4" />
                Add Item
              </Button>
            </div>

            <div className="grid grid-cols-12 text-sm font-medium text-muted-foreground px-2">
              <div className="col-span-5">Product</div>
              <div className="col-span-2">Price</div>
              <div className="col-span-2">Quantity</div>
              <div className="col-span-2">Subtotal</div>
              <div className="col-span-1" />
            </div>

            <Separator />

            {items.map((item, index) => {
              const subtotal = item.product?.price
                ? item.product.price * item.quantity
                : 0;

              return (
                <div
                  key={index}
                  className="grid grid-cols-12 gap-4 items-center px-2"
                >
                  <div className="col-span-5">
                    <ProductSelect
                      products={products}
                      value={item.product}
                      onChange={(product) => updateProduct(index, product)}
                    />
                  </div>

                  <div className="col-span-2 text-sm">
                    {item.product
                      ? `$ ${item.product.price.toLocaleString()}`
                      : "—"}
                  </div>

                  <div className="col-span-2">
                    <Input
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(index, Number(e.target.value))
                      }
                    />
                  </div>

                  <div className="col-span-2 text-sm font-medium">
                    $ {subtotal.toLocaleString()}
                  </div>

                  <div className="col-span-1 flex justify-end">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeItem(index)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          <Separator />

          {/* Summary */}
          <div className="flex justify-end">
            <div className="w-64 space-y-2 text-right">
              <div className="flex justify-between text-sm">
                <span>Total Items</span>
                <span>{computed.items.length}</span>
              </div>

              <Separator />

              <div className="flex justify-between text-xl font-semibold">
                <span>Total</span>
                <span>$ {computed.total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>

          <Button
            onClick={() => {
              handleSubmit();
              handleClose();
            }}
          >
            Save Purchase
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
