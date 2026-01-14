# ChatResponseChoice

## Example Usage

```typescript
import { ChatResponseChoice } from "@openrouter/sdk/models";

let value: ChatResponseChoice = {
  finishReason: "stop",
  index: 2823.76,
  message: {
    role: "assistant",
  },
};
```

## Fields

| Field                                                                        | Type                                                                         | Required                                                                     | Description                                                                  |
| ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `finishReason`                                                               | [models.ChatCompletionFinishReason](../models/chatcompletionfinishreason.md) | :heavy_check_mark:                                                           | N/A                                                                          |
| `index`                                                                      | *number*                                                                     | :heavy_check_mark:                                                           | N/A                                                                          |
| `message`                                                                    | [models.AssistantMessage](../models/assistantmessage.md)                     | :heavy_check_mark:                                                           | N/A                                                                          |
| `reasoningDetails`                                                           | *models.Schema3*[]                                                           | :heavy_minus_sign:                                                           | N/A                                                                          |
| `logprobs`                                                                   | [models.ChatMessageTokenLogprobs](../models/chatmessagetokenlogprobs.md)     | :heavy_minus_sign:                                                           | N/A                                                                          |