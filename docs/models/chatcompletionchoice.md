# ChatCompletionChoice

Chat completion choice

## Example Usage

```typescript
import { ChatCompletionChoice } from "open-router/models";

let value: ChatCompletionChoice = {
  finishReason: "stop",
  index: 8792.34,
  message: {
    role: "assistant",
    content: "<value>",
    refusal: "<value>",
  },
};
```

## Fields

| Field                                                                                    | Type                                                                                     | Required                                                                                 | Description                                                                              |
| ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `finishReason`                                                                           | [models.ChatCompletionChoiceFinishReason](../models/chatcompletionchoicefinishreason.md) | :heavy_check_mark:                                                                       | Reason the completion finished                                                           |
| `index`                                                                                  | *number*                                                                                 | :heavy_check_mark:                                                                       | Choice index                                                                             |
| `message`                                                                                | [models.ChatCompletionMessage](../models/chatcompletionmessage.md)                       | :heavy_check_mark:                                                                       | Assistant message in completion response                                                 |
| `logprobs`                                                                               | [models.ChatCompletionTokenLogprobs](../models/chatcompletiontokenlogprobs.md)           | :heavy_minus_sign:                                                                       | Log probabilities for the completion                                                     |