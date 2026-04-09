# OutputReasoningItem

An output item containing reasoning

## Example Usage

```typescript
import { OutputReasoningItem } from "@openrouter/sdk/models";

let value: OutputReasoningItem = {
  id: "msg-abc123",
  summary: [
    {
      text: "Analyzed the problem using first principles",
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
| `status`                                                           | *models.OutputReasoningItemStatusUnion*                            | :heavy_minus_sign:                                                 | N/A                                                                |                                                                    |
| `summary`                                                          | [models.ReasoningSummaryText](../models/reasoningsummarytext.md)[] | :heavy_check_mark:                                                 | N/A                                                                |                                                                    |
| `type`                                                             | *"reasoning"*                                                      | :heavy_check_mark:                                                 | N/A                                                                |                                                                    |
| `format`                                                           | [models.ReasoningFormat](../models/reasoningformat.md)             | :heavy_minus_sign:                                                 | N/A                                                                | unknown                                                            |
| `signature`                                                        | *string*                                                           | :heavy_minus_sign:                                                 | A signature for the reasoning content, used for verification       | EvcBCkgIChABGAIqQKkSDbRuVEQUk9qN1odC098l9SEj...                    |