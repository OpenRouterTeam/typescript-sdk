# ChatChoice

Chat completion choice

## Example Usage

```typescript
import { ChatChoice } from "@openrouter/sdk/models";

let value: ChatChoice = {
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
| `finishReason`                                                                                                     | [models.ChatFinishReasonEnum](../models/chatfinishreasonenum.md)                                                   | :heavy_check_mark:                                                                                                 | N/A                                                                                                                | stop                                                                                                               |
| `index`                                                                                                            | *number*                                                                                                           | :heavy_check_mark:                                                                                                 | Choice index                                                                                                       | 0                                                                                                                  |
| `message`                                                                                                          | [models.ChatAssistantMessage](../models/chatassistantmessage.md)                                                   | :heavy_check_mark:                                                                                                 | Assistant message for requests and responses                                                                       | {<br/>"role": "user",<br/>"content": "What is the capital of France?"<br/>}                                        |
| `logprobs`                                                                                                         | [models.ChatTokenLogprobs](../models/chattokenlogprobs.md)                                                         | :heavy_minus_sign:                                                                                                 | Log probabilities for the completion                                                                               | {<br/>"content": [<br/>{<br/>"token": " Hello",<br/>"logprob": -0.612345,<br/>"bytes": null,<br/>"top_logprobs": []<br/>}<br/>],<br/>"refusal": null<br/>} |