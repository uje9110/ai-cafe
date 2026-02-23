import { prisma } from "./prisma";

export const buildInsights = async () => {
  const interestCount: Record<string, number> = {};
  const favoriteProductCount: Record<string, number> = {};
  const purchasedProductCount: Record<string, number> = {};

  let totalRevenue = 0;
  let totalPurchases = 0;

  const customers = await prisma.customer.findMany({
    include: {
      favorites: {
        include: { product: true },
      },
      interests: {
        include: { tag: true },
      },
      purchases: {
        include: {
          items: {
            include: { product: true },
          },
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
      favoriteProductCount[productName] =
        (favoriteProductCount[productName] || 0) + 1;
    });

    // Count purchases
    customer.purchases.forEach((purchase) => {
      totalPurchases += 1;
      totalRevenue += Number(purchase.total);

      purchase.items.forEach((item) => {
        const productName = item.product.name;

        purchasedProductCount[productName] =
          (purchasedProductCount[productName] || 0) + item.quantity;
      });
    });
  });

  const totalCustomers = customers.length;

  const topInterests = Object.entries(interestCount)
    .map(([tag, count]) => ({
      tag,
      count,
      percentage: Math.round((count / totalCustomers) * 100),
    }))
    .sort((a, b) => b.count - a.count);

  const topFavoriteProducts = Object.entries(favoriteProductCount)
    .map(([product, count]) => ({
      product,
      count,
      percentage: Math.round((count / totalCustomers) * 100),
    }))
    .sort((a, b) => b.count - a.count);

  const topPurchasedProducts = Object.entries(purchasedProductCount)
    .map(([product, count]) => ({
      product,
      totalSold: count,
    }))
    .sort((a, b) => b.totalSold - a.totalSold);

  return {
    totalCustomers,
    totalPurchases,
    totalRevenue,
    averageOrderValue:
      totalPurchases > 0 ? totalRevenue / totalPurchases : 0,

    topInterests,
    topFavoriteProducts,
    topPurchasedProducts,
  };
};