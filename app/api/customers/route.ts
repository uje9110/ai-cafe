import { prisma } from "@/lib/prisma";
import { CustomerInputType } from "@/types/customer";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const name = searchParams.get("name");
  const interest = searchParams.get("interest");

  try {
    const customers = await prisma.customer.findMany({
      where: {
        AND: [
          name
            ? {
                name: {
                  contains: name,
                  mode: "insensitive",
                },
              }
            : {},
          interest
            ? {
                interests: {
                  some: {
                    tag: {
                      name: interest,
                    },
                  },
                },
              }
            : {},
        ],
      },
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

    return NextResponse.json(customers);
  } catch (error) {
    console.error("Failed to fetch customers:", error);
    return NextResponse.json(
      { message: "Failed to fetch customers" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  const body: CustomerInputType = await req.json();
  const { name, email, favoriteItems } = body;

  // Create customer and join it with favorite table
  const customer = await prisma.customer.create({
    data: {
      name,
      email,
      favorites:
        favoriteItems && favoriteItems.length > 0
          ? {
              create: favoriteItems.map((productId) => ({
                product: { connect: { id: productId } },
              })),
            }
          : undefined,
    },
    include: {
      favorites: true,
    },
  });

  // Join customer with interest table based on favorite
  if (favoriteItems && favoriteItems.length > 0) {
    const products = await prisma.product.findMany({
      where: {
        id: { in: favoriteItems },
      },
      include: {
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });

    const tagIds = Array.from(
      new Set(
        products.flatMap((product) => product.tags.map((pt) => pt.tagId)),
      ),
    );

    if (tagIds.length > 0) {
      await prisma.interest.createMany({
        data: tagIds.map((tagId) => ({
          customerId: customer.id,
          tagId,
        })),
        skipDuplicates: true,
      });
    }
  }

  return NextResponse.json(customer);
}
