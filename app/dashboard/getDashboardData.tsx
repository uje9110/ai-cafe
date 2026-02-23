import { prisma } from "@/lib/prisma";
import { startOfWeek, endOfWeek } from "date-fns";

export const getDashboardData = async () => {
  const now = new Date();
  const start = startOfWeek(now, { weekStartsOn: 1 });
  const end = endOfWeek(now, { weekStartsOn: 1 });

  // Total customers
  const totalCustomers = await prisma.customer.count();

  //  New customer
  const newCustomersThisWeek = await prisma.customer.count({
    where: {
      createdAt: {
        gte: start,
        lte: end,
      },
    },
  });

  // Top interests (group by tagId)
  const interestCounts = await prisma.interest.groupBy({
    by: ["tagId"],
    _count: {
      tagId: true,
    },
    orderBy: {
      _count: {
        tagId: "desc",
      },
    },
    take: 5,
  });

  // Fetch tag names
  const tagIds = interestCounts.map((i) => i.tagId);

  const tags = await prisma.tag.findMany({
    where: { id: { in: tagIds } },
  });

  const topInterests = interestCounts.map((i) => {
    const tag = tags.find((t) => t.id === i.tagId);
    return {
      id: i.tagId,
      name: tag?.name ?? "Unknown",
      count: i._count.tagId,
    };
  });

  // This week's promos
  const weeklyPromos = await prisma.promo.findMany({
    where: {
      createdAt: {
        gte: start,
        lte: end,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return {
    totalCustomers,
    topInterests,
    weeklyPromos,
    newCustomersThisWeek,
  };
};
