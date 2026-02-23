import { CustomerWithFavoriteInterest } from "@/types/customer";
import { prisma } from "./prisma";

export const buildInsights = async () => {
  const interestCount: Record<string, number> = {};
  const productCount: Record<string, number> = {};

  const customers = await prisma.customer.findMany({
    include: {
      favorites: {
        include: {
          product: true,
        },
      },
      interests: {
        include: {
          tag: true,
        },
      },
    },
  });

  customers.forEach((customer) => {
    // Count interests
    customer.interests.forEach((interest) => {
      const tagName = interest.tag.name;

      interestCount[tagName] = (interestCount[tagName] || 0) + 1;
    });

    // Count favorite products
    customer.favorites.forEach((favorite) => {
      const productName = favorite.product.name;

      productCount[productName] = (productCount[productName] || 0) + 1;
    });
  });

  const total = customers.length;

  const topInterests = Object.entries(interestCount)
    .map(([tag, count]) => ({
      tag,
      count,
      percentage: Math.round((count / total) * 100),
    }))
    .sort((a, b) => b.count - a.count);

  const topProducts = Object.entries(productCount)
    .map(([product, count]) => ({
      product,
      count,
      percentage: Math.round((count / total) * 100),
    }))
    .sort((a, b) => b.count - a.count);

  return {
    totalCustomers: total,
    topInterests,
    topProducts,
  };
};
