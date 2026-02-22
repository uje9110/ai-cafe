// app/api/ai/promo/route.ts

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { buildInsights } from "@/lib/insight";
import { generatePromo } from "@/lib/ai/promo";

export async function POST() {
  const customers = await prisma.customer.findMany({
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

  const insights = buildInsights(customers);

  const aiText = await generatePromo(insights);

  try {
    const parsed = JSON.parse(aiText);
    return NextResponse.json(parsed);
  } catch {
    return NextResponse.json({ raw: aiText });
  }
}
