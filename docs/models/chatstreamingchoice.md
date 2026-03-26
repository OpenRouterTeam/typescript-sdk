# ChatStreamingChoice

Streaming completion choice chunk

## Example Usage

```typescript
import { ChatStreamingChoice } from "@openrouter/sdk/models";

let value: ChatStreamingChoice = {
  delta: {},
  finishReason: null,
  index: 0,
};
```

## Fields

| Field                                                                                                              | Type                                                                                                               | Required                                                                                                           | Description                                                                                                        | Example                                                                                                            |
| ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------ |
| `delta`                                                                                                            | [models.ChatStreamingMessageChunk](../models/chatstreamingmessagechunk.md)                                         | :heavy_check_mark:                                                                                                 | Delta changes in streaming response                                                                                | {<br/>"role": "assistant",<br/>"content": "Hello"<br/>}                                                            |
| `finishReason`                                                                                                     | *any*                                                                                                              | :heavy_check_mark:                                                                                                 | N/A                                                                                                                |                                                                                                                    |
| `index`                                                                                                            | *number*                                                                                                           | :heavy_check_mark:                                                                                                 | Choice index                                                                                                       | 0                                                                                                                  |
| `logprobs`                                                                                                         | [models.ChatMessageTokenLogprobs](../models/chatmessagetokenlogprobs.md)                                           | :heavy_minus_sign:                                                                                                 | Log probabilities for the completion                                                                               | {<br/>"content": [<br/>{<br/>"token": " Hello",<br/>"logprob": -0.612345,<br/>"bytes": null,<br/>"top_logprobs": []<br/>}<br/>],<br/>"refusal": null<br/>} |