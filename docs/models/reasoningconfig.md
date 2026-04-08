# ReasoningConfig

Configuration for reasoning mode in the response

## Example Usage

```typescript
import { ReasoningConfig } from "@openrouter/sdk/models";

let value: ReasoningConfig = {};
```

## Fields

| Field                                                                      | Type                                                                       | Required                                                                   | Description                                                                | Example                                                                    |
| -------------------------------------------------------------------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| `effort`                                                                   | [models.ReasoningEffort](../models/reasoningeffort.md)                     | :heavy_minus_sign:                                                         | N/A                                                                        | medium                                                                     |
| `summary`                                                                  | [models.ReasoningSummaryVerbosity](../models/reasoningsummaryverbosity.md) | :heavy_minus_sign:                                                         | N/A                                                                        | auto                                                                       |
| `maxTokens`                                                                | *number*                                                                   | :heavy_minus_sign:                                                         | N/A                                                                        |                                                                            |
| `enabled`                                                                  | *boolean*                                                                  | :heavy_minus_sign:                                                         | N/A                                                                        |                                                                            |