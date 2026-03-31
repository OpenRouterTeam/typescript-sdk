# ChatStreamChoice

Streaming completion choice chunk

## Example Usage

```typescript
import { ChatStreamChoice } from "@openrouter/sdk/models";

let value: ChatStreamChoice = {
  delta: {},
  finishReason: null,
  index: 0,
};
```

## Fields

| Field                                                                                                              | Type                                                                                                               | Required                                                                                                           | Description                                                                                                        | Example                                                                                                            |
| ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------ |
| `delta`                                                                                                            | [models.ChatStreamDelta](../models/chatstreamdelta.md)                                                             | :heavy_check_mark:                                                                                                 | Delta changes in streaming response                                                                                | {<br/>"role": "assistant",<br/>"content": "Hello"<br/>}                                                            |
| `finishReason`                                                                                                     | *any*                                                                                                              | :heavy_check_mark:                                                                                                 | N/A                                                                                                                |                                                                                                                    |
| `index`                                                                                                            | *number*                                                                                                           | :heavy_check_mark:                                                                                                 | Choice index                                                                                                       | 0                                                                                                                  |
| `logprobs`                                                                                                         | [models.ChatTokenLogprobs](../models/chattokenlogprobs.md)                                                         | :heavy_minus_sign:                                                                                                 | Log probabilities for the completion                                                                               | {<br/>"content": [<br/>{<br/>"token": " Hello",<br/>"logprob": -0.612345,<br/>"bytes": null,<br/>"top_logprobs": []<br/>}<br/>],<br/>"refusal": null<br/>} |