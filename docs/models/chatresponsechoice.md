# ChatResponseChoice

## Example Usage

```typescript
import { ChatResponseChoice } from "@openrouter/sdk/models";

let value: ChatResponseChoice = {
  finishReason: "stop",
  index: 2823.76,
  message: {
    role: "assistant",
    content: "<value>",
    name: "<value>",
    toolCalls: [
      {
        id: "<id>",
        type: "function",
        function: {
          name: "<value>",
          arguments: "<value>",
        },
      },
    ],
    refusal: "<value>",
    reasoning: "<value>",
  },
  logprobs: {
    content: [
      {
        token: "<value>",
        logprob: 7572.98,
        bytes: [
          9191.5,
          2986.81,
          8603.48,
        ],
        topLogprobs: [
          {
            token: "<value>",
            logprob: 1362.57,
            bytes: [
              7000.29,
              7450.46,
              6296.9,
            ],
          },
        ],
      },
    ],
    refusal: [],
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