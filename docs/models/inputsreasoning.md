# InputsReasoning

An output item containing reasoning

## Example Usage

```typescript
import { InputsReasoning } from "@openrouter/sdk/models";

let value: InputsReasoning = {
  id: "reasoning-123",
  summary: [
    {
      text: "Analyzed the problem and found the optimal solution.",
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
| `status`                                                           | *models.InputsStatusUnion2*                                        | :heavy_minus_sign:                                                 | N/A                                                                |                                                                    |
| `summary`                                                          | [models.ReasoningSummaryText](../models/reasoningsummarytext.md)[] | :heavy_check_mark:                                                 | N/A                                                                |                                                                    |
| `type`                                                             | [models.InputsTypeReasoning](../models/inputstypereasoning.md)     | :heavy_check_mark:                                                 | N/A                                                                |                                                                    |
| `format`                                                           | [models.ReasoningFormat](../models/reasoningformat.md)             | :heavy_minus_sign:                                                 | N/A                                                                | unknown                                                            |
| `signature`                                                        | *string*                                                           | :heavy_minus_sign:                                                 | A signature for the reasoning content, used for verification       | EvcBCkgIChABGAIqQKkSDbRuVEQUk9qN1odC098l9SEj...                    |