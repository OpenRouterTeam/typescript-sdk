# OpenResponsesInputItemReasoning

## Example Usage

```typescript
import { OpenResponsesInputItemReasoning } from "@openrouter/sdk/models";

let value: OpenResponsesInputItemReasoning = {
  type: "reasoning",
  id: "reasoning-abc123",
  content: [
    {
      type: "reasoning_text",
      text: "Let me think step by step about this problem...",
    },
  ],
  summary: [
    {
      type: "summary_text",
      text: "Analyzed the problem using first principles",
    },
  ],
  encryptedContent: "<value>",
};
```

## Fields

| Field                                                                                          | Type                                                                                           | Required                                                                                       | Description                                                                                    |
| ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `type`                                                                                         | [models.OpenResponsesInputItemTypeReasoning](../models/openresponsesinputitemtypereasoning.md) | :heavy_check_mark:                                                                             | N/A                                                                                            |
| `id`                                                                                           | *string*                                                                                       | :heavy_check_mark:                                                                             | N/A                                                                                            |
| `content`                                                                                      | [models.ReasoningTextContent](../models/reasoningtextcontent.md)[]                             | :heavy_minus_sign:                                                                             | N/A                                                                                            |
| `summary`                                                                                      | [models.ReasoningSummaryText](../models/reasoningsummarytext.md)[]                             | :heavy_check_mark:                                                                             | N/A                                                                                            |
| `encryptedContent`                                                                             | *string*                                                                                       | :heavy_minus_sign:                                                                             | N/A                                                                                            |