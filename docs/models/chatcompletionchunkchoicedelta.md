# ChatCompletionChunkChoiceDelta

Delta changes in streaming response

## Example Usage

```typescript
import { ChatCompletionChunkChoiceDelta } from "open-router/models";

let value: ChatCompletionChunkChoiceDelta = {};
```

## Fields

| Field                                                                                                  | Type                                                                                                   | Required                                                                                               | Description                                                                                            |
| ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| `role`                                                                                                 | [models.ChatCompletionChunkChoiceDeltaRole](../models/chatcompletionchunkchoicedeltarole.md)           | :heavy_minus_sign:                                                                                     | The role of the message author                                                                         |
| `content`                                                                                              | *string*                                                                                               | :heavy_minus_sign:                                                                                     | Message content delta                                                                                  |
| `reasoning`                                                                                            | *string*                                                                                               | :heavy_minus_sign:                                                                                     | Reasoning content delta                                                                                |
| `refusal`                                                                                              | *string*                                                                                               | :heavy_minus_sign:                                                                                     | Refusal message delta                                                                                  |
| `toolCalls`                                                                                            | [models.ChatCompletionChunkChoiceDeltaToolCall](../models/chatcompletionchunkchoicedeltatoolcall.md)[] | :heavy_minus_sign:                                                                                     | Tool calls delta                                                                                       |
| `reasoningDetails`                                                                                     | *models.ReasoningDetail*[]                                                                             | :heavy_minus_sign:                                                                                     | Reasoning details delta to send reasoning details back to upstream                                     |
| `annotations`                                                                                          | *models.AnnotationDetail*[]                                                                            | :heavy_minus_sign:                                                                                     | Annotations delta to send annotations back to upstream                                                 |