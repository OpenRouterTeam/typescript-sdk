# OpenResponsesReasoningConfig

Configuration for reasoning mode in the response

## Example Usage

```typescript
import { OpenResponsesReasoningConfig } from "@openrouter/sdk/models";

let value: OpenResponsesReasoningConfig = {
  effort: "minimal",
  summary: "auto",
  maxTokens: 5685.88,
  enabled: true,
};
```

## Fields

| Field                                                                                        | Type                                                                                         | Required                                                                                     | Description                                                                                  |
| -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `effort`                                                                                     | [models.OpenResponsesReasoningConfigEffort](../models/openresponsesreasoningconfigeffort.md) | :heavy_minus_sign:                                                                           | N/A                                                                                          |
| `summary`                                                                                    | [models.ReasoningSummaryVerbosity](../models/reasoningsummaryverbosity.md)                   | :heavy_minus_sign:                                                                           | N/A                                                                                          |
| `maxTokens`                                                                                  | *number*                                                                                     | :heavy_minus_sign:                                                                           | N/A                                                                                          |
| `enabled`                                                                                    | *boolean*                                                                                    | :heavy_minus_sign:                                                                           | N/A                                                                                          |