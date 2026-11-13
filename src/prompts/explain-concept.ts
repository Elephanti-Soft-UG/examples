// Example Prompt: returns several messages, not just one. An assistant message lets you
// "prefill" the start of the model's reply to fix its tone and format.
import { definePrompt, type PromptMessage } from "@mcpexpress/core";
import { z } from "zod";

// --- 1. Define your Args Schema ---------------------------------------------------------------
const ArgsSchema = z.object({
  topic: z.string().min(1).describe("The concept to explain, e.g. 'compound interest'"),
  audience: z
    .enum(["child", "beginner", "expert"])
    .default("beginner")
    .describe("Who the explanation is for"),
});

// --- 2. Render Function -----------------------------------------------------------------------
const STYLE = {
  child: "a curious 10-year-old: simple words, one everyday analogy, no jargon",
  beginner: "a smart beginner: plain language, one worked example, define any terms you use",
  expert: "an expert: precise terminology, edge cases and trade-offs, no hand-holding",
} as const;

const render = ({ topic, audience }: z.infer<typeof ArgsSchema>): PromptMessage[] => [
  {
    role: "user",
    content: { type: "text", text: `Explain "${topic}" for ${STYLE[audience]}. Keep it under 200 words.` },
  },
  {
    role: "assistant",
    content: { type: "text", text: `Here is ${topic}, in a nutshell:` },
  },
];

// --- 3. Define the prompt ---------------------------------------------------------------------
export const explainConcept = definePrompt({
  name: "explain_concept",
  title: "Explain a concept",
  description: "Explain any concept at the right level for a child, a beginner or an expert.",
  args: ArgsSchema,
  render: (args) => render(args),
});
