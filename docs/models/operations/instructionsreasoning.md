# InstructionsReasoning

## Example Usage

```typescript
import { InstructionsReasoning } from "@openrouter/sdk/models/operations";

let value: InstructionsReasoning = {
  type: "reasoning",
  id: "<id>",
  summary: [
    {
      type: "summary_text",
      text: "<value>",
    },
  ],
};
```

## Fields

| Field                                                                                                        | Type                                                                                                         | Required                                                                                                     | Description                                                                                                  |
| ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------ |
| `type`                                                                                                       | [operations.InstructionsTypeReasoning](../../models/operations/instructionstypereasoning.md)                 | :heavy_check_mark:                                                                                           | N/A                                                                                                          |
| `id`                                                                                                         | *string*                                                                                                     | :heavy_check_mark:                                                                                           | N/A                                                                                                          |
| `content`                                                                                                    | [operations.InstructionsContentReasoningText](../../models/operations/instructionscontentreasoningtext.md)[] | :heavy_minus_sign:                                                                                           | N/A                                                                                                          |
| `summary`                                                                                                    | [operations.InstructionsSummary](../../models/operations/instructionssummary.md)[]                           | :heavy_check_mark:                                                                                           | N/A                                                                                                          |
| `encryptedContent`                                                                                           | *string*                                                                                                     | :heavy_minus_sign:                                                                                           | N/A                                                                                                          |
| `signature`                                                                                                  | *string*                                                                                                     | :heavy_minus_sign:                                                                                           | N/A                                                                                                          |
| `format`                                                                                                     | [operations.InstructionsFormat](../../models/operations/instructionsformat.md)                               | :heavy_minus_sign:                                                                                           | N/A                                                                                                          |