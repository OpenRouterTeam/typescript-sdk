# ChatStreamingChoice

## Example Usage

```typescript
import { ChatStreamingChoice } from "@openrouter/sdk/models";

let value: ChatStreamingChoice = {
  delta: {},
  finishReason: "error",
  index: 3511.86,
};
```

## Fields

| Field                                                                                  | Type                                                                                   | Required                                                                               | Description                                                                            |
| -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| `delta`                                                                                | [models.ChatStreamingMessageChunk](../models/chatstreamingmessagechunk.md)             | :heavy_check_mark:                                                                     | N/A                                                                                    |
| `finishReason`                                                                         | [models.ChatStreamingChoiceFinishReason](../models/chatstreamingchoicefinishreason.md) | :heavy_check_mark:                                                                     | N/A                                                                                    |
| `index`                                                                                | *number*                                                                               | :heavy_check_mark:                                                                     | N/A                                                                                    |
| `logprobs`                                                                             | [models.ChatMessageTokenLogprobs](../models/chatmessagetokenlogprobs.md)               | :heavy_minus_sign:                                                                     | N/A                                                                                    |