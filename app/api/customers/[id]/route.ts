import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { CustomerInputType } from "@/types/customer";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export async function DELETE(req: NextRequest, { params }: Params) {
  const { id } = await params;

  const customer = await prisma.customer.delete({
    where: { id },
  });

  return NextResponse.json(customer);
}

export async function PATCH(req: NextRequest, { params }: Params) {
  const { id } = await params;
  const body: CustomerInputType = await req.json();
  const { name, email, favoriteItems } = body;

  const result = await prisma.$transaction(async (tx) => {
    // Update basic data
    const updatedCustomer = await tx.customer.update({
      where: { id },
      data: {
        name,
        email,
      },
    });

    if (favoriteItems) {
      /* ----------------------------------
     FAVORITES DIFF SYNC
  ----------------------------------- */

      const existingFavorites = await tx.favorite.findMany({
        where: { customerId: id },
        select: { productId: true },
      });

      const existingFavoriteIds = existingFavorites.map((f) => f.productId);

      const toCreateFavorites = favoriteItems.filter(
        (pid) => !existingFavoriteIds.includes(pid),
      );

      const toDeleteFavorites = existingFavoriteIds.filter(
        (pid) => !favoriteItems.includes(pid),
      );

      if (toCreateFavorites.length > 0) {
        await tx.favorite.createMany({
          data: toCreateFavorites.map((productId) => ({
            customerId: id,
            productId,
          })),
          skipDuplicates: true,
        });
      }

      if (toDeleteFavorites.length > 0) {
        await tx.favorite.deleteMany({
          where: {
            customerId: id,
            productId: { in: toDeleteFavorites },
          },
        });
      }

      /* ----------------------------------
   INTEREST ADD-ONLY SYNC
----------------------------------- */

      const products = await tx.product.findMany({
        where: { id: { in: favoriteItems } },
        include: { tags: true },
      });

      const newTagIds = Array.from(
        new Set(products.flatMap((p) => p.tags.map((pt) => pt.tagId))),
      );

      const existingInterests = await tx.interest.findMany({
        where: { customerId: id },
        select: { tagId: true },
      });

      const existingTagIds = new Set(existingInterests.map((i) => i.tagId));

      const toCreateInterests = newTagIds.filter(
        (tagId) => !existingTagIds.has(tagId),
      );

      if (toCreateInterests.length > 0) {
        await tx.interest.createMany({
          data: toCreateInterests.map((tagId) => ({
            customerId: id,
            tagId,
          })),
          skipDuplicates: true,
        });
      }
    }

    return updatedCustomer;
  });

  return NextResponse.json(result);
}
