import { Product, ProductTag, Tag } from "@prisma/client";

export type TagInputType = {
  name: string;
};

export type ProductInputType = {
  id?: string;
  name: string;
  price: number;
  tagIds: string[];
};

export type ProductWithTags = Product & {
  tags: (ProductTag & {
    tag: Tag;
  })[];
};
