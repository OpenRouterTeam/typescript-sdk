# OpenResponsesInputReasoning

An output item containing reasoning

## Example Usage

```typescript
import { OpenResponsesInputReasoning } from "@openrouter/sdk/models";

let value: OpenResponsesInputReasoning = {
  type: "reasoning",
  id: "reasoning-abc123",
  summary: [
    {
      type: "summary_text",
      text: "Analyzed the problem using first principles",
    },
  ],
};
```

## Fields

| Field                                                                                  | Type                                                                                   | Required                                                                               | Description                                                                            | Example                                                                                |
| -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| `type`                                                                                 | [models.OpenResponsesInputTypeReasoning](../models/openresponsesinputtypereasoning.md) | :heavy_check_mark:                                                                     | N/A                                                                                    |                                                                                        |
| `id`                                                                                   | *string*                                                                               | :heavy_check_mark:                                                                     | N/A                                                                                    |                                                                                        |
| `content`                                                                              | [models.ReasoningTextContent](../models/reasoningtextcontent.md)[]                     | :heavy_minus_sign:                                                                     | N/A                                                                                    |                                                                                        |
| `summary`                                                                              | [models.ReasoningSummaryText](../models/reasoningsummarytext.md)[]                     | :heavy_check_mark:                                                                     | N/A                                                                                    |                                                                                        |
| `encryptedContent`                                                                     | *string*                                                                               | :heavy_minus_sign:                                                                     | N/A                                                                                    |                                                                                        |
| `status`                                                                               | *models.OpenResponsesInputStatusUnion2*                                                | :heavy_minus_sign:                                                                     | N/A                                                                                    |                                                                                        |
| `signature`                                                                            | *string*                                                                               | :heavy_minus_sign:                                                                     | A signature for the reasoning content, used for verification                           | EvcBCkgIChABGAIqQKkSDbRuVEQUk9qN1odC098l9SEj...                                        |
| `format`                                                                               | [models.OpenResponsesInputFormat](../models/openresponsesinputformat.md)               | :heavy_minus_sign:                                                                     | The format of the reasoning content                                                    | anthropic-claude-v1                                                                    |