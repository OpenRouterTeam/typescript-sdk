# ChatCompletionMessage

## Example Usage

```typescript
import { ChatCompletionMessage } from "@openrouter/sdk/models";

let value: ChatCompletionMessage = {
  role: "assistant",
};
```

## Fields

| Field                                                            | Type                                                             | Required                                                         | Description                                                      |
| ---------------------------------------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------- |
| `role`                                                           | *string*                                                         | :heavy_check_mark:                                               | N/A                                                              |
| `content`                                                        | *models.ChatCompletionMessageContent*                            | :heavy_minus_sign:                                               | N/A                                                              |
| `name`                                                           | *string*                                                         | :heavy_minus_sign:                                               | N/A                                                              |
| `toolCalls`                                                      | [models.ChatMessageToolCall](../models/chatmessagetoolcall.md)[] | :heavy_minus_sign:                                               | N/A                                                              |
| `refusal`                                                        | *string*                                                         | :heavy_minus_sign:                                               | N/A                                                              |
| `reasoning`                                                      | *string*                                                         | :heavy_minus_sign:                                               | N/A                                                              |