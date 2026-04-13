# UpdateGuardrailRequest

## Example Usage

```typescript
import { UpdateGuardrailRequest } from "@openrouter/sdk/models";

let value: UpdateGuardrailRequest = {};
```

## Fields

| Field                                                        | Type                                                         | Required                                                     | Description                                                  | Example                                                      |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `allowedModels`                                              | *string*[]                                                   | :heavy_minus_sign:                                           | Array of model identifiers (slug or canonical_slug accepted) | [<br/>"openai/gpt-5.2"<br/>]                                 |
| `allowedProviders`                                           | *string*[]                                                   | :heavy_minus_sign:                                           | New list of allowed provider IDs                             | [<br/>"openai",<br/>"anthropic",<br/>"deepseek"<br/>]        |
| `description`                                                | *string*                                                     | :heavy_minus_sign:                                           | New description for the guardrail                            | Updated description                                          |
| `enforceZdr`                                                 | *boolean*                                                    | :heavy_minus_sign:                                           | Whether to enforce zero data retention                       | true                                                         |
| `ignoredProviders`                                           | *string*[]                                                   | :heavy_minus_sign:                                           | List of provider IDs to exclude from routing                 | [<br/>"azure"<br/>]                                          |
| `limitUsd`                                                   | *number*                                                     | :heavy_minus_sign:                                           | New spending limit in USD                                    | 75                                                           |
| `name`                                                       | *string*                                                     | :heavy_minus_sign:                                           | New name for the guardrail                                   | Updated Guardrail Name                                       |
| `resetInterval`                                              | [models.GuardrailInterval](../models/guardrailinterval.md)   | :heavy_minus_sign:                                           | Interval at which the limit resets (daily, weekly, monthly)  | monthly                                                      |