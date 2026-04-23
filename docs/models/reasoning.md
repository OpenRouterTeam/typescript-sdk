# Reasoning

Configuration options for reasoning models

## Example Usage

```typescript
import { Reasoning } from "@openrouter/sdk/models";

let value: Reasoning = {};
```

## Fields

| Field                                                                                      | Type                                                                                       | Required                                                                                   | Description                                                                                | Example                                                                                    |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| `effort`                                                                                   | [models.ChatRequestEffort](../models/chatrequesteffort.md)                                 | :heavy_minus_sign:                                                                         | Constrains effort on reasoning for reasoning models                                        | medium                                                                                     |
| `summary`                                                                                  | [models.ChatReasoningSummaryVerbosityEnum](../models/chatreasoningsummaryverbosityenum.md) | :heavy_minus_sign:                                                                         | N/A                                                                                        | concise                                                                                    |