# ReasoningItem

Reasoning output item with signature and format extensions

## Example Usage

```typescript
import { ReasoningItem } from "@openrouter/sdk/models";

let value: ReasoningItem = {
  id: "reasoning-abc123",
  summary: [
    {
      text: "Step by step analysis",
      type: "summary_text",
    },
  ],
  type: "reasoning",
};
```

## Fields

| Field                                                              | Type                                                               | Required                                                           | Description                                                        | Example                                                            |
| ------------------------------------------------------------------ | ------------------------------------------------------------------ | ------------------------------------------------------------------ | ------------------------------------------------------------------ | ------------------------------------------------------------------ |
| `content`                                                          | [models.ReasoningTextContent](../models/reasoningtextcontent.md)[] | :heavy_minus_sign:                                                 | N/A                                                                |                                                                    |
| `encryptedContent`                                                 | *string*                                                           | :heavy_minus_sign:                                                 | N/A                                                                |                                                                    |
| `id`                                                               | *string*                                                           | :heavy_check_mark:                                                 | N/A                                                                |                                                                    |
| `status`                                                           | *models.ReasoningItemStatusUnion*                                  | :heavy_minus_sign:                                                 | N/A                                                                |                                                                    |
| `summary`                                                          | [models.ReasoningSummaryText](../models/reasoningsummarytext.md)[] | :heavy_check_mark:                                                 | N/A                                                                |                                                                    |
| `type`                                                             | [models.ReasoningItemType](../models/reasoningitemtype.md)         | :heavy_check_mark:                                                 | N/A                                                                |                                                                    |
| `format`                                                           | [models.ReasoningFormat](../models/reasoningformat.md)             | :heavy_minus_sign:                                                 | N/A                                                                | unknown                                                            |
| `signature`                                                        | *string*                                                           | :heavy_minus_sign:                                                 | N/A                                                                |                                                                    |