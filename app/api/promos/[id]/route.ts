import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export async function DELETE(req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;

    await prisma.promo.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Promo deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to delete promo" },
      { status: 500 },
    );
  }
}
