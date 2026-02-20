# ChatStreamingMessageChunk

Delta changes in streaming response

## Example Usage

```typescript
import { ChatStreamingMessageChunk } from "@openrouter/sdk/models";

let value: ChatStreamingMessageChunk = {};
```

## Fields

| Field                                                                              | Type                                                                               | Required                                                                           | Description                                                                        | Example                                                                            |
| ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `role`                                                                             | [models.ChatStreamingMessageChunkRole](../models/chatstreamingmessagechunkrole.md) | :heavy_minus_sign:                                                                 | The role of the message author                                                     | assistant                                                                          |
| `content`                                                                          | *string*                                                                           | :heavy_minus_sign:                                                                 | Message content delta                                                              | Hello                                                                              |
| `reasoning`                                                                        | *string*                                                                           | :heavy_minus_sign:                                                                 | Reasoning content delta                                                            | I need to                                                                          |
| `refusal`                                                                          | *string*                                                                           | :heavy_minus_sign:                                                                 | Refusal message delta                                                              | <nil>                                                                              |
| `toolCalls`                                                                        | [models.ChatStreamingMessageToolCall](../models/chatstreamingmessagetoolcall.md)[] | :heavy_minus_sign:                                                                 | Tool calls delta                                                                   |                                                                                    |
| `reasoningDetails`                                                                 | *models.ReasoningDetailUnion*[]                                                    | :heavy_minus_sign:                                                                 | Reasoning details for extended thinking models                                     |                                                                                    |