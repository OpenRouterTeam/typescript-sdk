# ChatCompletionChunkChoiceDeltaToolCall

Tool call delta for streaming responses

## Example Usage

```typescript
import { ChatCompletionChunkChoiceDeltaToolCall } from "open-router/models";

let value: ChatCompletionChunkChoiceDeltaToolCall = {
  index: 4920.78,
};
```

## Fields

| Field                                                                                                                | Type                                                                                                                 | Required                                                                                                             | Description                                                                                                          |
| -------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `index`                                                                                                              | *number*                                                                                                             | :heavy_check_mark:                                                                                                   | Tool call index in the array                                                                                         |
| `id`                                                                                                                 | *string*                                                                                                             | :heavy_minus_sign:                                                                                                   | Tool call identifier                                                                                                 |
| `type`                                                                                                               | [models.ChatCompletionChunkChoiceDeltaToolCallType](../models/chatcompletionchunkchoicedeltatoolcalltype.md)         | :heavy_minus_sign:                                                                                                   | Tool call type                                                                                                       |
| `function`                                                                                                           | [models.ChatCompletionChunkChoiceDeltaToolCallFunction](../models/chatcompletionchunkchoicedeltatoolcallfunction.md) | :heavy_minus_sign:                                                                                                   | Function call details                                                                                                |