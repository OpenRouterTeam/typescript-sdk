# ChatCompletionChunkWrapper

## Example Usage

```typescript
import { ChatCompletionChunkWrapper } from "open-router/models";

let value: ChatCompletionChunkWrapper = {
  data: {
    id: "<id>",
    choices: [
      {
        delta: {},
        finishReason: "stop",
        index: 4065.76,
      },
    ],
    created: 6130.82,
    model: "Mercielago",
    object: "chat.completion.chunk",
  },
};
```

## Fields

| Field                                                          | Type                                                           | Required                                                       | Description                                                    |
| -------------------------------------------------------------- | -------------------------------------------------------------- | -------------------------------------------------------------- | -------------------------------------------------------------- |
| `data`                                                         | [models.ChatCompletionChunk](../models/chatcompletionchunk.md) | :heavy_check_mark:                                             | Streaming chat completion chunk                                |