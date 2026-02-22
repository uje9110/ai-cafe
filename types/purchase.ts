import { Customer, Product, Purchase, PurchaseItem } from "@prisma/client";

export type PurchaseWithItems = Purchase & {
  customer: Customer;
  items: (PurchaseItem & {
    product: Product;
  })[];
};
