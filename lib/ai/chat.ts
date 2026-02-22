import { streamText } from "ai";
import { prisma } from "@/lib/prisma";
import { openrouter } from "./ai";

export async function generateChatResponse(messages: any) {
  // 1️⃣ Fetch customer insights
  const customers = await prisma.customer.findMany({
    include: {
      favorites: { include: { product: true } },
      interests: { include: { tag: true } },
    },
  });

  // 2️⃣ Build summary
  const insightSummary = customers.map((customer) => ({
    name: customer.name,
    email: customer.email,
    favorites: customer.favorites.map((f) => f.product.name),
    interests: customer.interests.map((i) => i.tag.name),
  }));

  // 3️⃣ Stream AI response
  return streamText({
    model: openrouter("openrouter/auto"),

    system: `
You are a business intelligence AI assistant.

You have access to customer insights data.
Use it to answer questions strategically.

Customer Insights:
${JSON.stringify(insightSummary, null, 2)}

Rules:
- Use the data when relevant.
- Be concise.
- If question unrelated, answer normally.
`,

    messages, // ✅ pass through directly
  });
}
