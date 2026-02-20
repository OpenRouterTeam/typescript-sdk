# ChatResponseChoice

Chat completion choice

## Example Usage

```typescript
import { ChatResponseChoice } from "@openrouter/sdk/models";

let value: ChatResponseChoice = {
  finishReason: "stop",
  index: 0,
  message: {
    role: "assistant",
  },
};
```

## Fields

| Field                                                                                                              | Type                                                                                                               | Required                                                                                                           | Description                                                                                                        | Example                                                                                                            |
| ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------ |
| `finishReason`                                                                                                     | *any*                                                                                                              | :heavy_check_mark:                                                                                                 | N/A                                                                                                                |                                                                                                                    |
| `index`                                                                                                            | *number*                                                                                                           | :heavy_check_mark:                                                                                                 | Choice index                                                                                                       | 0                                                                                                                  |
| `message`                                                                                                          | [models.AssistantMessage](../models/assistantmessage.md)                                                           | :heavy_check_mark:                                                                                                 | Assistant message for requests and responses                                                                       | {<br/>"role": "user",<br/>"content": "What is the capital of France?"<br/>}                                        |
| `logprobs`                                                                                                         | [models.ChatMessageTokenLogprobs](../models/chatmessagetokenlogprobs.md)                                           | :heavy_minus_sign:                                                                                                 | Log probabilities for the completion                                                                               | {<br/>"content": [<br/>{<br/>"token": " Hello",<br/>"logprob": -0.612345,<br/>"bytes": null,<br/>"top_logprobs": []<br/>}<br/>],<br/>"refusal": null<br/>} |