// Example Skill: the smallest complete skill. Only a name, a description and instructions.
// A skill teaches the agent a workflow; here it shows how to use the get_exchange_rates tool
// in this project to answer "how much is X in Y?" questions.
//
// Every skill file in this project follows the same layout, top to bottom:
//   1. Instructions        the markdown body of SKILL.md, what the agent follows
//   2. defineSkill({...})  metadata + wiring; stays short
import { defineSkill } from "@mcpexpress/core";

// --- 1. Instructions --------------------------------------------------------------------------
// Plain markdown. The SKILL.md frontmatter is generated from the fields in defineSkill, so
// write only the body here.
const instructions = `# Convert currency

Use this workflow when the user wants to know what an amount is worth in another currency.

## Steps

1. Work out the amount, the source currency and the target currencies from the request.
   Use 3-letter ISO codes (USD, EUR, GBP, ...). If the source currency is unclear, ask.
2. Call the \`get_exchange_rates\` tool with the source currency as \`base\` and the target
   currencies as \`symbols\`. Fetch all targets in one call.
3. Multiply the amount by each rate. Round to 2 decimal places (0 for JPY and KRW).
4. Answer with one line per currency, e.g. \`100 USD = 92.15 EUR\`, then the date the rates
   are from.

## Notes

- Rates are European Central Bank reference rates, published once per working day. Say so if
  the user asks for a live or intraday rate.
- Never guess a rate. If the tool fails, tell the user and stop.
`;

// --- 2. Define the skill ----------------------------------------------------------------------
// Export it from src/tools.ts to be auto detected on MCP Express.
// Served at skill://convert-currency/SKILL.md
export const convertCurrency = defineSkill({
    name: "convert-currency",
    description:
        "Convert an amount of money from one currency to one or more others using today's " +
        "exchange rates. Use when the user asks how much something costs or is worth in " +
        "another currency, e.g. 'what is 250 EUR in USD?'.",
    instructions,
});
