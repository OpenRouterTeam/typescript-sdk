# ResponseReasoningConfig

Reasoning configuration for Responses API

## Example Usage

```typescript
import { ResponseReasoningConfig } from "@openrouter/sdk/models";

let value: ResponseReasoningConfig = {
  effort: "medium",
  summary: "auto",
  maxTokens: 9189.68,
  enabled: false,
};
```

## Fields

| Field                                                                              | Type                                                                               | Required                                                                           | Description                                                                        | Example                                                                            |
| ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `effort`                                                                           | [models.ResponseReasoningConfigEffort](../models/responsereasoningconfigeffort.md) | :heavy_minus_sign:                                                                 | N/A                                                                                |                                                                                    |
| `summary`                                                                          | [models.ResponseReasoningSummaryMode](../models/responsereasoningsummarymode.md)   | :heavy_minus_sign:                                                                 | N/A                                                                                | auto                                                                               |
| `maxTokens`                                                                        | *number*                                                                           | :heavy_minus_sign:                                                                 | N/A                                                                                |                                                                                    |
| `enabled`                                                                          | *boolean*                                                                          | :heavy_minus_sign:                                                                 | N/A                                                                                |                                                                                    |