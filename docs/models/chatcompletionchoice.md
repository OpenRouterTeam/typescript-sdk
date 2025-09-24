# ChatCompletionChoice

## Example Usage

```typescript
import { ChatCompletionChoice } from "@openrouter/sdk/models";

let value: ChatCompletionChoice = {
  finishReason: "stop",
  index: 8792.34,
  message: {
    role: "assistant",
  },
};
```

## Fields

| Field                                                                                    | Type                                                                                     | Required                                                                                 | Description                                                                              |
| ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `finishReason`                                                                           | [models.ChatCompletionChoiceFinishReason](../models/chatcompletionchoicefinishreason.md) | :heavy_check_mark:                                                                       | N/A                                                                                      |
| `index`                                                                                  | *number*                                                                                 | :heavy_check_mark:                                                                       | N/A                                                                                      |
| `message`                                                                                | [models.ChatCompletionMessage](../models/chatcompletionmessage.md)                       | :heavy_check_mark:                                                                       | N/A                                                                                      |
| `logprobs`                                                                               | [models.ChatMessageTokenLogprobs](../models/chatmessagetokenlogprobs.md)                 | :heavy_minus_sign:                                                                       | N/A                                                                                      |