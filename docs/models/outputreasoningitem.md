# OutputReasoningItem

An output item containing reasoning

## Example Usage

```typescript
import { OutputReasoningItem } from "@openrouter/sdk/models";

let value: OutputReasoningItem = {
  type: "reasoning",
  id: "msg-abc123",
  summary: [
    {
      type: "summary_text",
      text: "Analyzed the problem using first principles",
    },
  ],
};
```

## Fields

| Field                                                                  | Type                                                                   | Required                                                               | Description                                                            | Example                                                                |
| ---------------------------------------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| `type`                                                                 | [models.OutputReasoningItemType](../models/outputreasoningitemtype.md) | :heavy_check_mark:                                                     | N/A                                                                    |                                                                        |
| `id`                                                                   | *string*                                                               | :heavy_check_mark:                                                     | N/A                                                                    |                                                                        |
| `content`                                                              | [models.ReasoningTextContent](../models/reasoningtextcontent.md)[]     | :heavy_minus_sign:                                                     | N/A                                                                    |                                                                        |
| `summary`                                                              | [models.ReasoningSummaryText](../models/reasoningsummarytext.md)[]     | :heavy_check_mark:                                                     | N/A                                                                    |                                                                        |
| `encryptedContent`                                                     | *string*                                                               | :heavy_minus_sign:                                                     | N/A                                                                    |                                                                        |
| `status`                                                               | *models.OutputReasoningItemStatusUnion*                                | :heavy_minus_sign:                                                     | N/A                                                                    |                                                                        |
| `signature`                                                            | *string*                                                               | :heavy_minus_sign:                                                     | A signature for the reasoning content, used for verification           | EvcBCkgIChABGAIqQKkSDbRuVEQUk9qN1odC098l9SEj...                        |
| `format`                                                               | [models.ReasoningFormat](../models/reasoningformat.md)                 | :heavy_minus_sign:                                                     | N/A                                                                    | unknown                                                                |