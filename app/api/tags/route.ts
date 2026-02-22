import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const tags = await prisma.tag.findMany({
      orderBy: { name: "asc" },
    });

    return NextResponse.json(tags, { status: 200 });
  } catch (error) {
    console.error("GET TAGS ERROR:", error);
    return NextResponse.json(
      { message: "Failed to fetch tags" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name } = body;

    if (!name || typeof name !== "string") {
      return NextResponse.json(
        { message: "Tag name is required" },
        { status: 400 },
      );
    }

    // Prevent duplicate tags
    const existing = await prisma.tag.findUnique({
      where: { name },
    });

    if (existing) {
      return NextResponse.json(existing, { status: 200 });
    }

    const tag = await prisma.tag.create({
      data: { name },
    });

    return NextResponse.json(tag, { status: 200 });
  } catch (error) {
    console.error("CREATE TAG ERROR:", error);
    return NextResponse.json(
      { message: "Failed to create tag" },
      { status: 500 },
    );
  }
}
