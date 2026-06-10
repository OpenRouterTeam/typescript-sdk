# AdvisorServerToolOpenRouter

OpenRouter built-in server tool: consults a higher-intelligence advisor model (any OpenRouter model) for guidance mid-generation and returns its response. The advisor may run as a sub-agent with its own tools. Include multiple entries to offer several named advisors; at most one entry may omit `name` to act as the default advisor.

## Example Usage

```typescript
import { AdvisorServerToolOpenRouter } from "@openrouter/sdk/models";

let value: AdvisorServerToolOpenRouter = {
  type: "openrouter:advisor",
};
```

## Fields

| Field                                                                                  | Type                                                                                   | Required                                                                               | Description                                                                            | Example                                                                                |
| -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| `parameters`                                                                           | [models.AdvisorServerToolConfig](../models/advisorservertoolconfig.md)                 | :heavy_minus_sign:                                                                     | Configuration for one openrouter:advisor server tool entry.                            | {<br/>"model": "~anthropic/claude-opus-latest",<br/>"name": "reviewer"<br/>}           |
| `type`                                                                                 | [models.AdvisorServerToolOpenRouterType](../models/advisorservertoolopenroutertype.md) | :heavy_check_mark:                                                                     | N/A                                                                                    |                                                                                        |