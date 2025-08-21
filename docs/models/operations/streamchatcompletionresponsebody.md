# StreamChatCompletionResponseBody

Successful chat completion response

## Example Usage

```typescript
import { StreamChatCompletionResponseBody } from "open-router/models/operations";

let value: StreamChatCompletionResponseBody = {
  data: {
    id: "<id>",
    choices: [
      {
        delta: {},
        finishReason: "length",
        index: 7881.03,
      },
    ],
    created: 2431.23,
    model: "Explorer",
    object: "chat.completion.chunk",
  },
};
```

## Fields

| Field                                                             | Type                                                              | Required                                                          | Description                                                       |
| ----------------------------------------------------------------- | ----------------------------------------------------------------- | ----------------------------------------------------------------- | ----------------------------------------------------------------- |
| `data`                                                            | [models.ChatCompletionChunk](../../models/chatcompletionchunk.md) | :heavy_check_mark:                                                | Streaming chat completion chunk                                   |