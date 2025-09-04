/**
 * kawaiiMagic agent (minimal wire-up; no long-term memory; tool contract lives separately).
 * For MLP we call the model in /api/magic. Later we can move the call into a Mastra tool.
 */
export const kawaiiMagic = {
  name: "kawaiiMagic",
  version: "0.1.0",
  // NOTE: Placeholders to keep Mastra presence without tight coupling yet.
  // Future: register breakdownTask as a real Mastra tool and route calls through it.
};