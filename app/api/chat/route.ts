import {
  convertToModelMessages,
  streamText,
  UIMessage,
} from "ai";
import { google } from "@ai-sdk/google";
import { buildInsights } from "@/lib/insight";

export async function POST(req: Request) {
  const { messages } = (await req.json()) as { messages: UIMessage[] };

  const insightSummary = await buildInsights();

  const result = streamText({
    model: google("gemini-2.5-flash"),
    system: `
You are a business intelligence AI assistant.

Customer Insights:
${JSON.stringify(insightSummary)}

Rules:
- Use the data when relevant
- Be concise
`,

    messages: await convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}
