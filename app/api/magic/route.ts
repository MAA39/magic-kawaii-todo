/**
 * POST /api/magic
 * Body: { title: string, pien: 0|1|2|3|4 }
 * Returns: { steps: string[] }
 *
 * Implementation notes:
 *  - Uses Vercel AI SDK Google provider (Gemini 2.5). Requires GOOGLE_GENERATIVE_AI_API_KEY.
 *  - Enforces the prompt contract from src/mastra/tools/breakdown-task.ts.
 *  - Depth=1 only. No duplicates. Enforce range by pien post-guard (truncate if over).
 */
import { NextRequest, NextResponse } from "next/server";
import { BreakdownInput, BreakdownOutput, BREAKDOWN_PROMPT_CONTRACT } from "@/src/mastra/tools/breakdown-task";
import { generateText } from "ai";
import { google } from "@ai-sdk/google";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const parse = BreakdownInput.safeParse(body);
  if (!parse.success) {
    return NextResponse.json({ error: "invalid input" }, { status: 400 });
  }
  const { title, pien } = parse.data;

  try {
    const model = google("gemini-2.0-flash-exp");
    const { text } = await generateText({
      model,
      prompt: `${BREAKDOWN_PROMPT_CONTRACT}\nTask: ${title}\nPien: ${pien}`,
    });

    // Parse JSON safely
    let out;
    try {
      out = JSON.parse(text || "{}");
    } catch (e) {
      // Fallback for safety if JSON parsing fails
      out = { steps: [
        "メモ：AIの出力をパースできませんでした。再試行してください。"
      ]};
    }

    // Guard: range by pien
    const maxByPien = [3,5,7,9,10][pien]!;
    out.steps = Array.from(new Set(out.steps || [])).slice(0, maxByPien);

    const safe = BreakdownOutput.safeParse(out);
    if (!safe.success) {
      return NextResponse.json({ error: "bad model output" }, { status: 502 });
    }
    return NextResponse.json(safe.data);
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ error: "internal server error" }, { status: 500 });
  }
}