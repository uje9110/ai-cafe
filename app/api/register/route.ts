import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    // validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 },
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: "Password must be at least 6 characters" },
        { status: 400 },
      );
    }

    // User Exist
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Email already registered" },
        { status: 409 },
      );
    }

    // Create User
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const { password: _, ...safeUser } = user;

    return NextResponse.json(
      { message: "User created successfully", user: safeUser },
      { status: 201 },
    );
  } catch (error) {
    console.error("REGISTER_ERROR", error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
