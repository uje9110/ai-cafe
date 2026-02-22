import { generateText } from "ai";
import { openrouter } from "./ai";

export async function generatePromo(insights: any) {
  const { text } = await generateText({
    model: openrouter("arcee-ai/trinity-large-preview:free"),
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

  return text;
}
