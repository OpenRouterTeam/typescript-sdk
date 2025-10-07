# ResponsesOutputItemReasoning

Reasoning output item

## Example Usage

```typescript
import { ResponsesOutputItemReasoning } from "@openrouter/sdk/models";

let value: ResponsesOutputItemReasoning = {
  type: "reasoning",
  id: "<id>",
  content: [
    {
      type: "reasoning_text",
      text: "<value>",
    },
  ],
  summary: [
    {
      type: "summary_text",
      text: "Based on the analysis, the answer is...",
    },
  ],
  encryptedContent: "<value>",
  signature: "<value>",
  format: "unknown",
};
```

## Fields

| Field                                                                                        | Type                                                                                         | Required                                                                                     | Description                                                                                  |
| -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `type`                                                                                       | [models.ResponsesOutputItemReasoningType](../models/responsesoutputitemreasoningtype.md)     | :heavy_check_mark:                                                                           | N/A                                                                                          |
| `id`                                                                                         | *string*                                                                                     | :heavy_check_mark:                                                                           | N/A                                                                                          |
| `content`                                                                                    | [models.ResponsesReasoningTextContent](../models/responsesreasoningtextcontent.md)[]         | :heavy_minus_sign:                                                                           | N/A                                                                                          |
| `summary`                                                                                    | [models.ResponsesReasoningSummaryText](../models/responsesreasoningsummarytext.md)[]         | :heavy_check_mark:                                                                           | N/A                                                                                          |
| `encryptedContent`                                                                           | *string*                                                                                     | :heavy_minus_sign:                                                                           | N/A                                                                                          |
| `signature`                                                                                  | *string*                                                                                     | :heavy_minus_sign:                                                                           | N/A                                                                                          |
| `format`                                                                                     | [models.ResponsesOutputItemReasoningFormat](../models/responsesoutputitemreasoningformat.md) | :heavy_minus_sign:                                                                           | N/A                                                                                          |