# ReasoningItem

Reasoning output item with signature and format extensions

## Example Usage

```typescript
import { ReasoningItem } from "@openrouter/sdk/models";

let value: ReasoningItem = {
  type: "reasoning",
  id: "reasoning-abc123",
  summary: [
    {
      type: "summary_text",
      text: "Step by step analysis",
    },
  ],
};
```

## Fields

| Field                                                              | Type                                                               | Required                                                           | Description                                                        |
| ------------------------------------------------------------------ | ------------------------------------------------------------------ | ------------------------------------------------------------------ | ------------------------------------------------------------------ |
| `type`                                                             | [models.ReasoningItemType](../models/reasoningitemtype.md)         | :heavy_check_mark:                                                 | N/A                                                                |
| `id`                                                               | *string*                                                           | :heavy_check_mark:                                                 | N/A                                                                |
| `content`                                                          | [models.ReasoningTextContent](../models/reasoningtextcontent.md)[] | :heavy_minus_sign:                                                 | N/A                                                                |
| `summary`                                                          | [models.ReasoningSummaryText](../models/reasoningsummarytext.md)[] | :heavy_check_mark:                                                 | N/A                                                                |
| `encryptedContent`                                                 | *string*                                                           | :heavy_minus_sign:                                                 | N/A                                                                |
| `status`                                                           | *models.ReasoningItemStatusUnion*                                  | :heavy_minus_sign:                                                 | N/A                                                                |
| `signature`                                                        | *string*                                                           | :heavy_minus_sign:                                                 | N/A                                                                |
| `format`                                                           | [models.ReasoningItemFormat](../models/reasoningitemformat.md)     | :heavy_minus_sign:                                                 | N/A                                                                |