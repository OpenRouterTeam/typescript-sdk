# ChatCompletion

## Example Usage

```typescript
import { ChatCompletion } from "openrouter/models";

let value: ChatCompletion = {
  id: "<id>",
  choices: [
    {
      finishReason: "stop",
      index: 7209.22,
      message: {
        role: "assistant",
        content: "<value>",
        refusal: "<value>",
      },
    },
  ],
  created: 4940.1,
  model: "Accord",
  object: "chat.completion",
};
```

## Fields

| Field                                                              | Type                                                               | Required                                                           | Description                                                        |
| ------------------------------------------------------------------ | ------------------------------------------------------------------ | ------------------------------------------------------------------ | ------------------------------------------------------------------ |
| `id`                                                               | *string*                                                           | :heavy_check_mark:                                                 | N/A                                                                |
| `choices`                                                          | [models.ChatCompletionChoice](../models/chatcompletionchoice.md)[] | :heavy_check_mark:                                                 | N/A                                                                |
| `created`                                                          | *number*                                                           | :heavy_check_mark:                                                 | N/A                                                                |
| `model`                                                            | *string*                                                           | :heavy_check_mark:                                                 | N/A                                                                |
| `object`                                                           | *string*                                                           | :heavy_check_mark:                                                 | N/A                                                                |
| `systemFingerprint`                                                | *string*                                                           | :heavy_minus_sign:                                                 | N/A                                                                |
| `usage`                                                            | [models.CompletionUsage](../models/completionusage.md)             | :heavy_minus_sign:                                                 | N/A                                                                |