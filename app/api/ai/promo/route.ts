
import { NextResponse } from "next/server";
import { buildInsights } from "@/lib/insight";
import { generateText } from "ai";
import { google } from "@ai-sdk/google";

export async function POST() {
  const insights = await buildInsights();

  const { text } = await generateText({
    model: google("gemini-2.5-flash"),
    system: `
You are a marketing strategist AI.
Return ONLY valid JSON.
Do not wrap in markdown.
`,
    prompt: `
Based on these customer insights:

${JSON.stringify(insights, null, 2)}

Generate 3 promo ideas in JSON:
[
  {
    "theme": "",
    "segment": "",
    "whyNow": "",
    "message": "",
    "bestTimeWindow": ""
  }
]

Return valid JSON only.
`,
  });

  try {
    const parsed = JSON.parse(text);
    return NextResponse.json(parsed);
  } catch {
    return NextResponse.json({ raw: text });
  }
}
