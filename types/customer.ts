import { Customer, Favorite, Interest, Product, Tag } from "@prisma/client";

export type CustomerInputType = {
  id?: string;
  name: string;
  email: string | null;
  favoriteItems?: string[];
};

export type CustomerWithFavoriteInterest = Customer & {
  favorites: (Favorite & { product: Product })[];
  interests: (Interest & { tag: Tag })[];
};
