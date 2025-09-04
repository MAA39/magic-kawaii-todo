/**
 * breakdownTask tool (contract-only for MLP).
 *
 * Purpose:
 *  - Split a single-line task into a FLAT, depth=1 list of actionable steps.
 *  - "pien" (0..4) is a HINT for granularity, NOT proportional.
 *
 * Output policy:
 *  - Imperative mood ("〜する"), one action per item.
 *  - No duplicates, no nesting, avoid vague nouns (prefer concrete verbs).
 *  - Target ranges by pien:
 *    0→2–3, 1→3–5, 2→4–7, 3→6–9, 4→8–10
 */
import { z } from "zod";
// NOTE: Kept tool contract here; actual model call is done in /api/magic for MLP.

export const BreakdownInput = z.object({
  title: z.string().min(1, "title required"),
  pien: z.number().int().min(0).max(4),
});

export const BreakdownOutput = z.object({
  steps: z.array(z.string().min(2)).max(10),
});

/** JSDoc prompt contract (to be reused by API/agent) */
export const BREAKDOWN_PROMPT_CONTRACT = `
You are a task splitter for a Japanese user.
- Return a FLAT list (depth=1) of actionable steps, imperative mood.
- No duplicates. No nested/numbered structure. One action per line.
- "pien" is a hint of granularity, not proportional. Respect the ranges:
  0: 2–3, 1: 3–5, 2: 4–7, 3: 6–9, 4: 8–10 items.
- Prefer concrete verbs ("買い物リストを作る") over vague nouns.
- Output JSON: {"steps":["...","..."]} only, no extra text.
`;