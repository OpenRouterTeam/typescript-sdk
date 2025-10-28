# ResponsesOutputItemReasoning

An output item containing reasoning

## Example Usage

```typescript
import { ResponsesOutputItemReasoning } from "@openrouter/sdk/models";

let value: ResponsesOutputItemReasoning = {
  type: "reasoning",
  id: "reasoning-123",
  content: [
    {
      type: "reasoning_text",
      text: "First, we analyze the problem...",
    },
  ],
  summary: [
    {
      type: "summary_text",
      text: "Analyzed the problem and found the optimal solution.",
    },
  ],
  encryptedContent: "<value>",
  status: "completed",
};
```

## Fields

| Field                                                                                    | Type                                                                                     | Required                                                                                 | Description                                                                              |
| ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `type`                                                                                   | [models.ResponsesOutputItemReasoningType](../models/responsesoutputitemreasoningtype.md) | :heavy_check_mark:                                                                       | N/A                                                                                      |
| `id`                                                                                     | *string*                                                                                 | :heavy_minus_sign:                                                                       | N/A                                                                                      |
| `content`                                                                                | [models.ReasoningTextContent](../models/reasoningtextcontent.md)[]                       | :heavy_minus_sign:                                                                       | N/A                                                                                      |
| `summary`                                                                                | [models.ReasoningSummaryText](../models/reasoningsummarytext.md)[]                       | :heavy_check_mark:                                                                       | N/A                                                                                      |
| `encryptedContent`                                                                       | *string*                                                                                 | :heavy_minus_sign:                                                                       | N/A                                                                                      |
| `status`                                                                                 | *models.ResponsesOutputItemReasoningStatusUnion*                                         | :heavy_minus_sign:                                                                       | N/A                                                                                      |