# ChatStreamingMessageChunk

## Example Usage

```typescript
import { ChatStreamingMessageChunk } from "@openrouter/sdk/models";

let value: ChatStreamingMessageChunk = {};
```

## Fields

| Field                                                                              | Type                                                                               | Required                                                                           | Description                                                                        |
| ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `role`                                                                             | [models.Role](../models/role.md)                                                   | :heavy_minus_sign:                                                                 | N/A                                                                                |
| `content`                                                                          | *string*                                                                           | :heavy_minus_sign:                                                                 | N/A                                                                                |
| `reasoning`                                                                        | *string*                                                                           | :heavy_minus_sign:                                                                 | N/A                                                                                |
| `refusal`                                                                          | *string*                                                                           | :heavy_minus_sign:                                                                 | N/A                                                                                |
| `toolCalls`                                                                        | [models.ChatStreamingMessageToolCall](../models/chatstreamingmessagetoolcall.md)[] | :heavy_minus_sign:                                                                 | N/A                                                                                |