import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const purchases = await prisma.purchase.findMany({
    include: {
      customer: true,
      items: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(purchases);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { customer, items } = body;

    if (!customer?.email || !items?.length) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const result = await prisma.$transaction(async (tx) => {
      const existingCustomer = await tx.customer.findUnique({
        where: { email: customer.email },
      });

      if (!existingCustomer) {
        throw new Error("Customer not found");
      }

      const purchase = await tx.purchase.create({
        data: {
          customerId: existingCustomer.id,
        },
      });

      let total = new Prisma.Decimal(0);

      for (const item of items) {
        const product = await tx.product.findFirst({
          where: { name: item.name },
          include: {
            tags: {
              include: {
                tag: true,
              },
            },
          },
        });

        if (!product) {
          throw new Error(`Product not found: ${item.name}`);
        }

        const subtotal = new Prisma.Decimal(product.price).mul(item.quantity);
        total = total.add(subtotal);

        await tx.purchaseItem.create({
          data: {
            purchaseId: purchase.id,
            productId: product.id,
            quantity: item.quantity,
            subtotal,
          },
        });

        /* -------------------------
     NEW LOGIC: Sync Interests
  -------------------------- */

        const existingInterests = await tx.interest.findMany({
          where: {
            customerId: existingCustomer.id,
          },
          select: {
            tagId: true,
          },
        });

        const existingTagIds = new Set(existingInterests.map((i) => i.tagId));

        const productTagIds = product.tags.map((pt) => pt.tagId);

        const missingTagIds = productTagIds.filter(
          (tagId) => !existingTagIds.has(tagId),
        );

        if (missingTagIds.length > 0) {
          await tx.interest.createMany({
            data: missingTagIds.map((tagId) => ({
              customerId: existingCustomer.id,
              tagId,
            })),
            skipDuplicates: true,
          });
        }
      }

      await tx.purchase.update({
        where: { id: purchase.id },
        data: { total },
      });

      return purchase;
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.log(error);
    
    return NextResponse.json({ error: "Failed to create purchase"}, { status: 500 });
  }
}
