import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export async function DELETE(req: NextRequest, { params }: Params) {
  const { id } = await params;

  const customer = await prisma.purchase.delete({
    where: { id },
  });

  return NextResponse.json(customer);
}
