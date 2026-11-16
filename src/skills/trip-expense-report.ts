// Example Skill: a skill with supporting files, a grouping path and optional metadata.
// It combines both tools in this project: add_numbers to total the expenses and
// get_exchange_rates to bring every expense into one home currency.
//
// Supporting files are only read by the agent when the instructions point to them, so keep
// SKILL.md short and move long reference material or templates into `files`.
import { defineSkill } from "@mcpexpress/core";

// --- 1. Instructions --------------------------------------------------------------------------
// Refer to supporting files by their path relative to the skill root.
const instructions = `# Trip expense report

Turn a list of travel expenses, possibly in several currencies, into a report totalled in
the traveller's home currency.

## Steps

1. Collect the expenses: date, description, amount and currency for each. Ask for the home
   currency if the user has not given one.
2. Check the list against \`references/expense-policy.md\` and flag anything that breaks it.
   Keep flagged items in the report.
3. For every currency other than the home currency, call \`get_exchange_rates\` once with the
   home currency as \`base\` and all foreign currencies as \`symbols\`. Convert each amount by
   dividing it by the rate for its currency.
4. Total the converted amounts with the \`add_numbers\` tool, adding them one at a time.
   Do not add them up yourself.
5. Fill in \`templates/report.md\` and return it to the user.
`;

// --- 2. Supporting files ----------------------------------------------------------------------
// Keyed by path relative to the skill root. The MIME type comes from the extension
// (.md -> text/markdown); pass { text, mimeType } to set it yourself.
const files = {
    "references/expense-policy.md": `# Expense policy

- Meals: up to 60 per day in the home currency, per person.
- Hotels: up to 180 per night in the home currency.
- Taxis are fine; flights must be economy class.
- Alcohol, minibar and personal entertainment are not reimbursed.
- Every expense over 25 needs a receipt.
`,
    "templates/report.md": `# Expense report: {{trip name}}

Traveller: {{name}}  ·  Home currency: {{home currency}}  ·  Rates from: {{rate date}}

| Date | Description | Amount | Currency | Rate | Amount ({{home currency}}) | Flag |
| ---- | ----------- | -----: | -------- | ---: | -------------------------: | ---- |
| ...  | ...         |    ... | ...      |  ... |                        ... | ...  |

**Total:** {{total}} {{home currency}}

**Flagged items:** {{list each flagged expense and the policy rule it breaks, or "None"}}
`,
};

// --- 3. Define the skill ----------------------------------------------------------------------
// `path` groups related skills under a common prefix in the URI.
// Served at skill://finance/trip-expense-report/SKILL.md, plus
//   skill://finance/trip-expense-report/references/expense-policy.md
//   skill://finance/trip-expense-report/templates/report.md
export const tripExpenseReport = defineSkill({
    name: "trip-expense-report",
    path: "finance",
    description:
        "Build a travel expense report from expenses in one or more currencies, converted and " +
        "totalled in a single home currency and checked against the expense policy. Use when " +
        "the user wants to total, convert or claim trip, travel or business expenses.",
    instructions,
    files,
    license: "MIT",
    compatibility: "Needs the get_exchange_rates and add_numbers tools from this server",
    metadata: { author: "mcp-express-examples", version: "1.0" },
});
