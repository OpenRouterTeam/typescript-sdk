# ChatStreamingMessageChunk

## Example Usage

```typescript
import { ChatStreamingMessageChunk } from "@openrouter/sdk/models";

let value: ChatStreamingMessageChunk = {
  role: "assistant",
  content: "<value>",
  reasoning: "<value>",
  refusal: "<value>",
  toolCalls: [
    {
      index: 932.78,
      id: "<id>",
      function: {
        name: "<value>",
        arguments: "<value>",
      },
    },
  ],
};
```

## Fields

| Field                                                                              | Type                                                                               | Required                                                                           | Description                                                                        |
| ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `role`                                                                             | [models.ChatStreamingMessageChunkRole](../models/chatstreamingmessagechunkrole.md) | :heavy_minus_sign:                                                                 | N/A                                                                                |
| `content`                                                                          | *string*                                                                           | :heavy_minus_sign:                                                                 | N/A                                                                                |
| `reasoning`                                                                        | *string*                                                                           | :heavy_minus_sign:                                                                 | N/A                                                                                |
| `refusal`                                                                          | *string*                                                                           | :heavy_minus_sign:                                                                 | N/A                                                                                |
| `toolCalls`                                                                        | [models.ChatStreamingMessageToolCall](../models/chatstreamingmessagetoolcall.md)[] | :heavy_minus_sign:                                                                 | N/A                                                                                |