import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Promo } from "@/types/promo";

export async function GET() {
  try {
    const promos = await prisma.promo.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(promos, { status: 200 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to fetch promos" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const data: Promo[] = await req.json();

    if (!Array.isArray(data)) {
      return NextResponse.json(
        { error: "Expected an array of promos" },
        { status: 400 },
      );
    }

    const result = await prisma.promo.createMany({
      data: data.map((promo) => ({
        theme: promo.theme,
        segment: promo.segment,
        whyNow: promo.whyNow,
        message: promo.message,
        bestTimeWindow: promo.bestTimeWindow ?? null,
      })),
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create promos" },
      { status: 500 },
    );
  }
}
