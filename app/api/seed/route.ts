
import {prisma} from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  const customer = await prisma.customer.create({
    data: {
      name: "John Doe",
      email: "john@example.com",
    },
  })

  return NextResponse.json(customer)
}
