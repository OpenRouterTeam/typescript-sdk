# ChatCompletion

Chat completion response

## Example Usage

```typescript
import { ChatCompletion } from "open-router/models";

let value: ChatCompletion = {
  id: "<id>",
  choices: [],
  created: 6764.71,
  model: "Altima",
  object: "chat.completion",
};
```

## Fields

| Field                                                              | Type                                                               | Required                                                           | Description                                                        |
| ------------------------------------------------------------------ | ------------------------------------------------------------------ | ------------------------------------------------------------------ | ------------------------------------------------------------------ |
| `id`                                                               | *string*                                                           | :heavy_check_mark:                                                 | Unique completion identifier                                       |
| `choices`                                                          | [models.ChatCompletionChoice](../models/chatcompletionchoice.md)[] | :heavy_check_mark:                                                 | List of completion choices                                         |
| `created`                                                          | *number*                                                           | :heavy_check_mark:                                                 | Unix timestamp of creation                                         |
| `model`                                                            | *string*                                                           | :heavy_check_mark:                                                 | Model used for completion                                          |
| `object`                                                           | [models.ChatCompletionObject](../models/chatcompletionobject.md)   | :heavy_check_mark:                                                 | N/A                                                                |
| `systemFingerprint`                                                | *string*                                                           | :heavy_minus_sign:                                                 | System fingerprint                                                 |
| `usage`                                                            | [models.CompletionUsage](../models/completionusage.md)             | :heavy_minus_sign:                                                 | Token usage statistics                                             |