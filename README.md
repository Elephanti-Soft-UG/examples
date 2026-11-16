# MCP Express Examples

This repository creates example MCP Server with tools defined. This server is currently deployed and maintained
under `https://sandbox.mcp-express.com/demo/mcp`. Connection instructions can be found at our [homepage](https://www.mcp-express.com).

## Deploy the code

To deploy the code into your self hosted MCP Express instance. Please follow the following instructions:

1. Package the code using `npm run package`.
2. Upload the code to the Provisioned MCP Server using the UI.

## Available Examples

### Tools

- **Add Numbers**: Adds two given numbers
- **Get Exchange Rates**: Retrieves the exchange rate from the https://frankfurter.dev based on the provided input currencies.

### Skills

- **Convert Currency** (`skill://convert-currency/SKILL.md`): Minimal skill that teaches the agent to convert amounts with the `get_exchange_rates` tool.
- **Trip Expense Report** (`skill://finance/trip-expense-report/SKILL.md`): Skill with supporting files (an expense policy and a report template), a `path` prefix and metadata. Combines `get_exchange_rates` and `add_numbers`.
