# ReasoningDetailSummary

Reasoning detail summary schema

## Example Usage

```typescript
import { ReasoningDetailSummary } from "@openrouter/sdk/models";

let value: ReasoningDetailSummary = {
  summary:
    "The model analyzed the problem by first identifying key constraints, then evaluating possible solutions...",
  type: "reasoning.summary",
};
```

## Fields

| Field                                                  | Type                                                   | Required                                               | Description                                            | Example                                                |
| ------------------------------------------------------ | ------------------------------------------------------ | ------------------------------------------------------ | ------------------------------------------------------ | ------------------------------------------------------ |
| `format`                                               | [models.ReasoningFormat](../models/reasoningformat.md) | :heavy_minus_sign:                                     | N/A                                                    | unknown                                                |
| `id`                                                   | *string*                                               | :heavy_minus_sign:                                     | N/A                                                    |                                                        |
| `index`                                                | *number*                                               | :heavy_minus_sign:                                     | N/A                                                    |                                                        |
| `summary`                                              | *string*                                               | :heavy_check_mark:                                     | N/A                                                    |                                                        |
| `type`                                                 | *"reasoning.summary"*                                  | :heavy_check_mark:                                     | N/A                                                    |                                                        |