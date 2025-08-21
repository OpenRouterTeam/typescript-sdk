# ChatCompletionChunkChoice

Streaming completion choice chunk

## Example Usage

```typescript
import { ChatCompletionChunkChoice } from "open-router/models";

let value: ChatCompletionChunkChoice = {
  delta: {},
  finishReason: "length",
  index: 5643.37,
};
```

## Fields

| Field                                                                                              | Type                                                                                               | Required                                                                                           | Description                                                                                        |
| -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `delta`                                                                                            | [models.ChatCompletionChunkChoiceDelta](../models/chatcompletionchunkchoicedelta.md)               | :heavy_check_mark:                                                                                 | Delta changes in streaming response                                                                |
| `finishReason`                                                                                     | [models.ChatCompletionChunkChoiceFinishReason](../models/chatcompletionchunkchoicefinishreason.md) | :heavy_check_mark:                                                                                 | N/A                                                                                                |
| `index`                                                                                            | *number*                                                                                           | :heavy_check_mark:                                                                                 | N/A                                                                                                |
| `logprobs`                                                                                         | [models.ChatCompletionTokenLogprobs](../models/chatcompletiontokenlogprobs.md)                     | :heavy_minus_sign:                                                                                 | Log probabilities for the completion                                                               |