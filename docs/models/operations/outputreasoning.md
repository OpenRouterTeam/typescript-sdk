# OutputReasoning

## Example Usage

```typescript
import { OutputReasoning } from "@openrouter/sdk/models/operations";

let value: OutputReasoning = {
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

| Field                                                                                            | Type                                                                                             | Required                                                                                         | Description                                                                                      |
| ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| `type`                                                                                           | [operations.OutputTypeReasoning](../../models/operations/outputtypereasoning.md)                 | :heavy_check_mark:                                                                               | N/A                                                                                              |
| `id`                                                                                             | *string*                                                                                         | :heavy_check_mark:                                                                               | N/A                                                                                              |
| `content`                                                                                        | [operations.OutputContentReasoningText](../../models/operations/outputcontentreasoningtext.md)[] | :heavy_minus_sign:                                                                               | N/A                                                                                              |
| `summary`                                                                                        | [operations.OutputSummary](../../models/operations/outputsummary.md)[]                           | :heavy_check_mark:                                                                               | N/A                                                                                              |
| `encryptedContent`                                                                               | *string*                                                                                         | :heavy_minus_sign:                                                                               | N/A                                                                                              |
| `signature`                                                                                      | *string*                                                                                         | :heavy_minus_sign:                                                                               | N/A                                                                                              |
| `format`                                                                                         | [operations.OutputFormat](../../models/operations/outputformat.md)                               | :heavy_minus_sign:                                                                               | N/A                                                                                              |