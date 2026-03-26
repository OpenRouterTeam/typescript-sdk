# SendChatCompletionRequestResponseBody

Successful chat completion response

## Example Usage

```typescript
import { SendChatCompletionRequestResponseBody } from "@openrouter/sdk/models/operations";

let value: SendChatCompletionRequestResponseBody = {
  data: {
    id: "chatcmpl-123",
    choices: [
      {
        delta: {},
        finishReason: null,
        index: 0,
      },
    ],
    created: 1677652288,
    model: "openai/gpt-4",
    object: "chat.completion.chunk",
  },
};
```

## Fields

| Field                                                                                                                                                                                                                   | Type                                                                                                                                                                                                                    | Required                                                                                                                                                                                                                | Description                                                                                                                                                                                                             | Example                                                                                                                                                                                                                 |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `data`                                                                                                                                                                                                                  | [models.ChatStreamingResponseChunk](../../models/chatstreamingresponsechunk.md)                                                                                                                                         | :heavy_check_mark:                                                                                                                                                                                                      | Streaming chat completion chunk                                                                                                                                                                                         | {<br/>"id": "chatcmpl-123",<br/>"object": "chat.completion.chunk",<br/>"created": 1677652288,<br/>"model": "openai/gpt-4",<br/>"choices": [<br/>{<br/>"index": 0,<br/>"delta": {<br/>"role": "assistant",<br/>"content": "Hello"<br/>},<br/>"finish_reason": null<br/>}<br/>]<br/>} |