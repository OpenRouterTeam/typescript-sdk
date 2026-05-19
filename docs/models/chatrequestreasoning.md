# ChatRequestReasoning

Configuration options for reasoning models

## Example Usage

```typescript
import { ChatRequestReasoning } from "@openrouter/sdk/models";

let value: ChatRequestReasoning = {};
```

## Fields

| Field                                                                                                     | Type                                                                                                      | Required                                                                                                  | Description                                                                                               | Example                                                                                                   |
| --------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `effort`                                                                                                  | [models.ChatRequestEffort](../models/chatrequesteffort.md)                                                | :heavy_minus_sign:                                                                                        | Constrains effort on reasoning for reasoning models                                                       | medium                                                                                                    |
| `enabled`                                                                                                 | *boolean*                                                                                                 | :heavy_minus_sign:                                                                                        | Whether to enable reasoning. When effort is provided without enabled, reasoning is automatically enabled. |                                                                                                           |
| `maxTokens`                                                                                               | *number*                                                                                                  | :heavy_minus_sign:                                                                                        | Maximum number of tokens to use for reasoning                                                             |                                                                                                           |
| `summary`                                                                                                 | [models.ChatReasoningSummaryVerbosityEnum](../models/chatreasoningsummaryverbosityenum.md)                | :heavy_minus_sign:                                                                                        | N/A                                                                                                       | concise                                                                                                   |