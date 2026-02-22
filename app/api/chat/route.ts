import { streamText } from "ai";
import { prisma } from "@/lib/prisma";
import { openrouter } from "@/lib/ai/ai";

export async function POST(req: Request) {
  const body = await req.json();

  const messages = body.messages.map((msg: any) => ({
    role: msg.role,
    content:
      msg.parts
        ?.filter((p: any) => p.type === "text")
        .map((p: any) => p.text)
        .join("") ?? "",
  }));

  const customers = await prisma.customer.findMany({
    include: {
      favorites: { include: { product: true } },
      interests: { include: { tag: true } },
    },
  });

  const insightSummary = customers.map((customer) => ({
    name: customer.name,
    email: customer.email,
    favorites: customer.favorites.map((f) => f.product.name),
    interests: customer.interests.map((i) => i.tag.name),
  }));

  const result = streamText({
    model: openrouter("arcee-ai/trinity-large-preview:free"),

    system: `
You are a business intelligence AI assistant.

Customer Insights:
${JSON.stringify(insightSummary)}

Rules:
- Use the data when relevant
- Be concise
`,

    messages,
  });

  return result.toUIMessageStreamResponse();
}
