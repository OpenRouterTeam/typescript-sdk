# ChatCompletionMessage

Assistant message in completion response

## Example Usage

```typescript
import { ChatCompletionMessage } from "open-router/models";

let value: ChatCompletionMessage = {
  role: "assistant",
  content: "<value>",
  refusal: "<value>",
};
```

## Fields

| Field                                                                                | Type                                                                                 | Required                                                                             | Description                                                                          |
| ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ |
| `role`                                                                               | [models.ChatCompletionMessageRole](../models/chatcompletionmessagerole.md)           | :heavy_check_mark:                                                                   | N/A                                                                                  |
| `content`                                                                            | *string*                                                                             | :heavy_check_mark:                                                                   | Message content                                                                      |
| `reasoning`                                                                          | *string*                                                                             | :heavy_minus_sign:                                                                   | Reasoning output                                                                     |
| `refusal`                                                                            | *string*                                                                             | :heavy_check_mark:                                                                   | Refusal message if content was refused                                               |
| `toolCalls`                                                                          | [models.ChatCompletionMessageToolCall](../models/chatcompletionmessagetoolcall.md)[] | :heavy_minus_sign:                                                                   | Tool calls made by the assistant                                                     |
| `reasoningDetails`                                                                   | *models.ReasoningDetail*[]                                                           | :heavy_minus_sign:                                                                   | Reasoning details delta to send reasoning details back to upstream                   |
| `annotations`                                                                        | *models.AnnotationDetail*[]                                                          | :heavy_minus_sign:                                                                   | Annotations delta to send annotations back to upstream                               |