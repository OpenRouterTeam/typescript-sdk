# InputReasoning

## Example Usage

```typescript
import { InputReasoning } from "@openrouter/sdk/models/operations";

let value: InputReasoning = {
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

| Field                                                                                              | Type                                                                                               | Required                                                                                           | Description                                                                                        |
| -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `type`                                                                                             | [operations.InputTypeReasoning](../../models/operations/inputtypereasoning.md)                     | :heavy_check_mark:                                                                                 | N/A                                                                                                |
| `id`                                                                                               | *string*                                                                                           | :heavy_check_mark:                                                                                 | N/A                                                                                                |
| `content`                                                                                          | [operations.ContentReasoningTextRequest](../../models/operations/contentreasoningtextrequest.md)[] | :heavy_minus_sign:                                                                                 | N/A                                                                                                |
| `summary`                                                                                          | [operations.InputSummary](../../models/operations/inputsummary.md)[]                               | :heavy_check_mark:                                                                                 | N/A                                                                                                |
| `encryptedContent`                                                                                 | *string*                                                                                           | :heavy_minus_sign:                                                                                 | N/A                                                                                                |
| `signature`                                                                                        | *string*                                                                                           | :heavy_minus_sign:                                                                                 | N/A                                                                                                |
| `format`                                                                                           | [operations.InputFormat](../../models/operations/inputformat.md)                                   | :heavy_minus_sign:                                                                                 | N/A                                                                                                |