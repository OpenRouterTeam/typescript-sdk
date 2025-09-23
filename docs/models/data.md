# Data

## Example Usage

```typescript
import { Data } from "openrouter/models";

let value: Data = {
  id: "<id>",
  choices: [
    {
      delta: {},
      finishReason: "content_filter",
      index: 214.57,
    },
  ],
  created: 5916.2,
  model: "Beetle",
  object: "chat.completion.chunk",
};
```

## Fields

| Field                                                                        | Type                                                                         | Required                                                                     | Description                                                                  |
| ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `id`                                                                         | *string*                                                                     | :heavy_check_mark:                                                           | N/A                                                                          |
| `choices`                                                                    | [models.ChatCompletionChunkChoice](../models/chatcompletionchunkchoice.md)[] | :heavy_check_mark:                                                           | N/A                                                                          |
| `created`                                                                    | *number*                                                                     | :heavy_check_mark:                                                           | N/A                                                                          |
| `model`                                                                      | *string*                                                                     | :heavy_check_mark:                                                           | N/A                                                                          |
| `object`                                                                     | *string*                                                                     | :heavy_check_mark:                                                           | N/A                                                                          |
| `systemFingerprint`                                                          | *string*                                                                     | :heavy_minus_sign:                                                           | N/A                                                                          |
| `usage`                                                                      | [models.CompletionUsage](../models/completionusage.md)                       | :heavy_minus_sign:                                                           | N/A                                                                          |