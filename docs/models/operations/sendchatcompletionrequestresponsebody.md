# SendChatCompletionRequestResponseBody

Successful chat completion response

## Example Usage

```typescript
import { SendChatCompletionRequestResponseBody } from "@openrouter/sdk/models/operations";

let value: SendChatCompletionRequestResponseBody = {
  data: {
    choices: [
      {
        delta: {},
        finishReason: null,
        index: 0,
      },
    ],
    created: 1677652288,
    id: "chatcmpl-123",
    model: "openai/gpt-4",
    object: "chat.completion.chunk",
  },
};
```

## Fields

| Field                                                                                                                                                                                                                   | Type                                                                                                                                                                                                                    | Required                                                                                                                                                                                                                | Description                                                                                                                                                                                                             | Example                                                                                                                                                                                                                 |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `data`                                                                                                                                                                                                                  | [models.ChatStreamChunk](../../models/chatstreamchunk.md)                                                                                                                                                               | :heavy_check_mark:                                                                                                                                                                                                      | Streaming chat completion chunk                                                                                                                                                                                         | {<br/>"choices": [<br/>{<br/>"delta": {<br/>"content": "Hello",<br/>"role": "assistant"<br/>},<br/>"finish_reason": null,<br/>"index": 0<br/>}<br/>],<br/>"created": 1677652288,<br/>"id": "chatcmpl-123",<br/>"model": "openai/gpt-4",<br/>"object": "chat.completion.chunk"<br/>} |