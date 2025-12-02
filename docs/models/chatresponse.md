# ChatResponse

## Example Usage

```typescript
import { ChatResponse } from "@openrouter/sdk/models";

let value: ChatResponse = {
  id: "<id>",
  choices: [],
  created: 9184.01,
  model: "Focus",
  object: "chat.completion",
};
```

## Fields

| Field                                                                    | Type                                                                     | Required                                                                 | Description                                                              |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------------ |
| `id`                                                                     | *string*                                                                 | :heavy_check_mark:                                                       | N/A                                                                      |
| `choices`                                                                | [models.ChatResponseChoice](../models/chatresponsechoice.md)[]           | :heavy_check_mark:                                                       | N/A                                                                      |
| `created`                                                                | *number*                                                                 | :heavy_check_mark:                                                       | N/A                                                                      |
| `model`                                                                  | *string*                                                                 | :heavy_check_mark:                                                       | N/A                                                                      |
| `object`                                                                 | *"chat.completion"*                                                      | :heavy_check_mark:                                                       | N/A                                                                      |
| `systemFingerprint`                                                      | *string*                                                                 | :heavy_minus_sign:                                                       | N/A                                                                      |
| `usage`                                                                  | [models.ChatGenerationTokenUsage](../models/chatgenerationtokenusage.md) | :heavy_minus_sign:                                                       | N/A                                                                      |