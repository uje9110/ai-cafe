import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const name = searchParams.get("name");
  const interest = searchParams.get("interest");

  const products = await prisma.product.findMany({
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
              tags: {
                some: { tag: { name: interest } },
              },
            }
          : {},
      ],
    },
    include: {
      tags: {
        include: {
          tag: true,
        },
      },
    },
  });

  return NextResponse.json(products);
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  const product = await prisma.product.create({
    data: {
      name: body.name,
      price: body.price,
      tags: {
        create:
          body.tagIds?.map((tagId: string) => ({
            tag: {
              connect: { id: tagId },
            },
          })) ?? [],
      },
    },
    include: {
      tags: {
        include: {
          tag: true,
        },
      },
    },
  });

  return NextResponse.json(product);
}
