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

| Field                                                                                | Type                                                                                 | Required                                                                             | Description                                                                          |
| ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ |
| `finishReason`                                                                       | [models.ChatResponseChoiceFinishReason](../models/chatresponsechoicefinishreason.md) | :heavy_check_mark:                                                                   | N/A                                                                                  |
| `index`                                                                              | *number*                                                                             | :heavy_check_mark:                                                                   | N/A                                                                                  |
| `message`                                                                            | [models.AssistantMessage](../models/assistantmessage.md)                             | :heavy_check_mark:                                                                   | N/A                                                                                  |
| `logprobs`                                                                           | [models.ChatMessageTokenLogprobs](../models/chatmessagetokenlogprobs.md)             | :heavy_minus_sign:                                                                   | N/A                                                                                  |