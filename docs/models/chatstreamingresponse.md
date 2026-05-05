# ChatStreamingResponse

Server-sent-event chunk for a streaming chat completion. When the request opts in via the `X-OpenRouter-Experimental-Metadata: standard` header (or `?metadata=standard` query param), the final chunk additionally carries an `openrouter_metadata` object describing routing decisions. The field is intentionally omitted from this schema while it is experimental — generated SDK consumers must access it via raw JSON until the shape is frozen.

## Example Usage

```typescript
import { ChatStreamingResponse } from "@openrouter/sdk/models";

let value: ChatStreamingResponse = {
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
| `data`                                                                                                                                                                                                                  | [models.ChatStreamChunk](../models/chatstreamchunk.md)                                                                                                                                                                  | :heavy_check_mark:                                                                                                                                                                                                      | Streaming chat completion chunk                                                                                                                                                                                         | {<br/>"choices": [<br/>{<br/>"delta": {<br/>"content": "Hello",<br/>"role": "assistant"<br/>},<br/>"finish_reason": null,<br/>"index": 0<br/>}<br/>],<br/>"created": 1677652288,<br/>"id": "chatcmpl-123",<br/>"model": "openai/gpt-4",<br/>"object": "chat.completion.chunk"<br/>} |