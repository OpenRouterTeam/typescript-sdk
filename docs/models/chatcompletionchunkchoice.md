# ChatCompletionChunkChoice

## Example Usage

```typescript
import { ChatCompletionChunkChoice } from "openrouter/models";

let value: ChatCompletionChunkChoice = {
  delta: {},
  finishReason: "length",
  index: 5643.37,
};
```

## Fields

| Field                                                                                              | Type                                                                                               | Required                                                                                           | Description                                                                                        |
| -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `delta`                                                                                            | [models.ChatCompletionChunkChoiceDelta](../models/chatcompletionchunkchoicedelta.md)               | :heavy_check_mark:                                                                                 | N/A                                                                                                |
| `finishReason`                                                                                     | [models.ChatCompletionChunkChoiceFinishReason](../models/chatcompletionchunkchoicefinishreason.md) | :heavy_check_mark:                                                                                 | N/A                                                                                                |
| `index`                                                                                            | *number*                                                                                           | :heavy_check_mark:                                                                                 | N/A                                                                                                |
| `logprobs`                                                                                         | [models.ChatCompletionTokenLogprobs](../models/chatcompletiontokenlogprobs.md)                     | :heavy_minus_sign:                                                                                 | N/A                                                                                                |