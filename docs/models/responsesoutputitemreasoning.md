# ResponsesOutputItemReasoning

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
      text: "<value>",
    },
  ],
  encryptedContent: "<value>",
};
```

## Fields

| Field                                                                                    | Type                                                                                     | Required                                                                                 | Description                                                                              |
| ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `type`                                                                                   | [models.ResponsesOutputItemTypeReasoning](../models/responsesoutputitemtypereasoning.md) | :heavy_check_mark:                                                                       | N/A                                                                                      |
| `id`                                                                                     | *string*                                                                                 | :heavy_check_mark:                                                                       | N/A                                                                                      |
| `content`                                                                                | [models.ReasoningTextContent](../models/reasoningtextcontent.md)[]                       | :heavy_minus_sign:                                                                       | N/A                                                                                      |
| `summary`                                                                                | [models.ReasoningSummaryText](../models/reasoningsummarytext.md)[]                       | :heavy_check_mark:                                                                       | N/A                                                                                      |
| `encryptedContent`                                                                       | *string*                                                                                 | :heavy_minus_sign:                                                                       | N/A                                                                                      |