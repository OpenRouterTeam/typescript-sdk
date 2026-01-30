# ChatStreamingMessageChunk

## Example Usage

```typescript
import { ChatStreamingMessageChunk } from "@openrouter/sdk/models";

let value: ChatStreamingMessageChunk = {};
```

## Fields

| Field                                                                              | Type                                                                               | Required                                                                           | Description                                                                        |
| ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `role`                                                                             | [models.ChatStreamingMessageChunkRole](../models/chatstreamingmessagechunkrole.md) | :heavy_minus_sign:                                                                 | N/A                                                                                |
| `content`                                                                          | *string*                                                                           | :heavy_minus_sign:                                                                 | N/A                                                                                |
| `reasoning`                                                                        | *string*                                                                           | :heavy_minus_sign:                                                                 | N/A                                                                                |
| `refusal`                                                                          | *string*                                                                           | :heavy_minus_sign:                                                                 | N/A                                                                                |
| `toolCalls`                                                                        | [models.ChatStreamingMessageToolCall](../models/chatstreamingmessagetoolcall.md)[] | :heavy_minus_sign:                                                                 | N/A                                                                                |
| `reasoningDetails`                                                                 | *models.Schema19*[]                                                                | :heavy_minus_sign:                                                                 | N/A                                                                                |