// Example Prompt: a reusable message template the user picks from the client (often as a
// slash command). It steers the model towards the get_exchange_rates tool in this project.
//
// Every prompt file in this project follows the same layout, top to bottom:
//   1. Args schema           what the user fills in
//   2. A Render function     builds the message(s) sent to the model
//   3. definePrompt({...})   metadata + wiring; stays short
import { definePrompt } from "@mcpexpress/core";
import { z } from "zod";

// --- 1. Define your Args Schema ---------------------------------------------------------------
// Clients send every prompt argument as a string, so fields must accept strings.
// Use .transform() to turn them into other types.
const Currency = z
    .string()
    .regex(/^[A-Za-z]{3}$/, "3-letter currency code, e.g. USD")
    .transform((code) => code.toUpperCase());

const ArgsSchema = z.object({
    base: Currency.default("USD").describe(
        "Currency to convert from, e.g. USD",
    ),
    symbols: z
        .string()
        .regex(
            /^[A-Za-z]{3}(\s*,\s*[A-Za-z]{3})*$/,
            "Comma-separated currency codes, e.g. EUR,GBP,JPY",
        )
        .transform((list) =>
            list.split(",").map((code) => code.trim().toUpperCase()),
        )
        .describe(
            "Comma-separated currencies to compare against, e.g. EUR,GBP,JPY",
        ),
});

// --- 2. Render Function -----------------------------------------------------------------------
// A plain string becomes a single user message.
const render = ({ base, symbols }: z.infer<typeof ArgsSchema>) =>
    `Use the get_exchange_rates tool to fetch the latest rates from ${base} to ${symbols.join(", ")}. ` +
    `Then write a short briefing: a table of the rates, how much 100 ${base} buys in each currency, ` +
    `and the date the rates are from.`;

// --- 3. Define the prompt ---------------------------------------------------------------------
// Define your prompt and export it from src/tools.ts to be auto detected on MCP Express.
export const currencyBriefing = definePrompt({
    name: "currency_briefing",
    title: "Currency briefing",
    description:
        "Get a short briefing on today's exchange rates from one currency to others.",
    args: ArgsSchema,
    render: (args) => render(args),
});
