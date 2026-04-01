# InputsReasoning

An output item containing reasoning

## Example Usage

```typescript
import { InputsReasoning } from "@openrouter/sdk/models";

let value: InputsReasoning = {
  type: "reasoning",
  id: "reasoning-123",
  summary: [
    {
      type: "summary_text",
      text: "Analyzed the problem and found the optimal solution.",
    },
  ],
};
```

## Fields

| Field                                                              | Type                                                               | Required                                                           | Description                                                        | Example                                                            |
| ------------------------------------------------------------------ | ------------------------------------------------------------------ | ------------------------------------------------------------------ | ------------------------------------------------------------------ | ------------------------------------------------------------------ |
| `type`                                                             | [models.InputsTypeReasoning](../models/inputstypereasoning.md)     | :heavy_check_mark:                                                 | N/A                                                                |                                                                    |
| `id`                                                               | *string*                                                           | :heavy_check_mark:                                                 | N/A                                                                |                                                                    |
| `content`                                                          | [models.ReasoningTextContent](../models/reasoningtextcontent.md)[] | :heavy_minus_sign:                                                 | N/A                                                                |                                                                    |
| `summary`                                                          | [models.ReasoningSummaryText](../models/reasoningsummarytext.md)[] | :heavy_check_mark:                                                 | N/A                                                                |                                                                    |
| `encryptedContent`                                                 | *string*                                                           | :heavy_minus_sign:                                                 | N/A                                                                |                                                                    |
| `status`                                                           | *models.InputsStatusUnion2*                                        | :heavy_minus_sign:                                                 | N/A                                                                |                                                                    |
| `signature`                                                        | *string*                                                           | :heavy_minus_sign:                                                 | A signature for the reasoning content, used for verification       | EvcBCkgIChABGAIqQKkSDbRuVEQUk9qN1odC098l9SEj...                    |
| `format`                                                           | [models.InputsFormat](../models/inputsformat.md)                   | :heavy_minus_sign:                                                 | The format of the reasoning content                                | anthropic-claude-v1                                                |