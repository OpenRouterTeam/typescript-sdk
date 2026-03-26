# ReasoningDetailSummary

Reasoning detail summary schema

## Example Usage

```typescript
import { ReasoningDetailSummary } from "@openrouter/sdk/models";

let value: ReasoningDetailSummary = {
  type: "reasoning.summary",
  summary:
    "The model analyzed the problem by first identifying key constraints, then evaluating possible solutions...",
};
```

## Fields

| Field                                                                            | Type                                                                             | Required                                                                         | Description                                                                      |
| -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `type`                                                                           | *"reasoning.summary"*                                                            | :heavy_check_mark:                                                               | N/A                                                                              |
| `summary`                                                                        | *string*                                                                         | :heavy_check_mark:                                                               | N/A                                                                              |
| `id`                                                                             | *string*                                                                         | :heavy_minus_sign:                                                               | N/A                                                                              |
| `format`                                                                         | [models.ReasoningDetailSummaryFormat](../models/reasoningdetailsummaryformat.md) | :heavy_minus_sign:                                                               | N/A                                                                              |
| `index`                                                                          | *number*                                                                         | :heavy_minus_sign:                                                               | N/A                                                                              |