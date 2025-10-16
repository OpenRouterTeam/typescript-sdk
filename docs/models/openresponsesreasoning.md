# OpenResponsesReasoning

Reasoning output item with signature and format extensions

## Example Usage

```typescript
import { OpenResponsesReasoning } from "@openrouter/sdk/models";

let value: OpenResponsesReasoning = {
  type: "reasoning",
  id: "<id>",
  content: [
    {
      type: "reasoning_text",
      text: "<value>",
    },
  ],
  summary: [],
  encryptedContent: "<value>",
  signature: "<value>",
  format: "anthropic-claude-v1",
};
```

## Fields

| Field                                                                            | Type                                                                             | Required                                                                         | Description                                                                      |
| -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `type`                                                                           | [models.OpenResponsesReasoningType](../models/openresponsesreasoningtype.md)     | :heavy_check_mark:                                                               | N/A                                                                              |
| `id`                                                                             | *string*                                                                         | :heavy_check_mark:                                                               | N/A                                                                              |
| `content`                                                                        | [models.ReasoningTextContent](../models/reasoningtextcontent.md)[]               | :heavy_minus_sign:                                                               | N/A                                                                              |
| `summary`                                                                        | [models.ReasoningSummaryText](../models/reasoningsummarytext.md)[]               | :heavy_check_mark:                                                               | N/A                                                                              |
| `encryptedContent`                                                               | *string*                                                                         | :heavy_minus_sign:                                                               | N/A                                                                              |
| `signature`                                                                      | *string*                                                                         | :heavy_minus_sign:                                                               | N/A                                                                              |
| `format`                                                                         | [models.OpenResponsesReasoningFormat](../models/openresponsesreasoningformat.md) | :heavy_minus_sign:                                                               | N/A                                                                              |