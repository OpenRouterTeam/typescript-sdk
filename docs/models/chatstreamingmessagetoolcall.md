# ChatStreamingMessageToolCall

Tool call delta for streaming responses

## Example Usage

```typescript
import { ChatStreamingMessageToolCall } from "@openrouter/sdk/models";

let value: ChatStreamingMessageToolCall = {
  index: 0,
};
```

## Fields

| Field                                                                                            | Type                                                                                             | Required                                                                                         | Description                                                                                      | Example                                                                                          |
| ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| `index`                                                                                          | *number*                                                                                         | :heavy_check_mark:                                                                               | Tool call index in the array                                                                     | 0                                                                                                |
| `id`                                                                                             | *string*                                                                                         | :heavy_minus_sign:                                                                               | Tool call identifier                                                                             | call_abc123                                                                                      |
| `type`                                                                                           | [models.ChatStreamingMessageToolCallType](../models/chatstreamingmessagetoolcalltype.md)         | :heavy_minus_sign:                                                                               | Tool call type                                                                                   | function                                                                                         |
| `function`                                                                                       | [models.ChatStreamingMessageToolCallFunction](../models/chatstreamingmessagetoolcallfunction.md) | :heavy_minus_sign:                                                                               | Function call details                                                                            |                                                                                                  |