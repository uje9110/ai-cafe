import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export async function DELETE(req: NextRequest, { params }: Params) {
  const { id } = await params;

  const product = await prisma.product.delete({
    where: { id },
  });

  return NextResponse.json(product);
}

export async function PATCH(req: NextRequest, { params }: Params) {
  const { id } = await params;
  const data = await req.json();

  const { tagIds, ...rest } = data;

  const product = await prisma.product.update({
    where: { id },
    data: {
      ...rest,
      tags: {
        deleteMany: {}, // remove existing relations
        create: tagIds.map((tagId: string) => ({
          tagId,
        })),
      },
    },
  });
  return NextResponse.json(product);
}
