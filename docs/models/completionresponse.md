# CompletionResponse

## Example Usage

```typescript
import { CompletionResponse } from "@openrouter/sdk/models";

let value: CompletionResponse = {
  id: "<id>",
  object: "text_completion",
  created: 7985.17,
  model: "Taurus",
  choices: [],
};
```

## Fields

| Field                                                      | Type                                                       | Required                                                   | Description                                                |
| ---------------------------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------- |
| `id`                                                       | *string*                                                   | :heavy_check_mark:                                         | N/A                                                        |
| `object`                                                   | *"text_completion"*                                        | :heavy_check_mark:                                         | N/A                                                        |
| `created`                                                  | *number*                                                   | :heavy_check_mark:                                         | N/A                                                        |
| `model`                                                    | *string*                                                   | :heavy_check_mark:                                         | N/A                                                        |
| `provider`                                                 | *string*                                                   | :heavy_minus_sign:                                         | N/A                                                        |
| `systemFingerprint`                                        | *string*                                                   | :heavy_minus_sign:                                         | N/A                                                        |
| `choices`                                                  | [models.CompletionChoice](../models/completionchoice.md)[] | :heavy_check_mark:                                         | N/A                                                        |
| `usage`                                                    | [models.CompletionUsage](../models/completionusage.md)     | :heavy_minus_sign:                                         | N/A                                                        |