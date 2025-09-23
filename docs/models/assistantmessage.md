# AssistantMessage

## Example Usage

```typescript
import { AssistantMessage } from "openrouter/models";

let value: AssistantMessage = {
  role: "assistant",
};
```

## Fields

| Field                                                            | Type                                                             | Required                                                         | Description                                                      |
| ---------------------------------------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------- |
| `role`                                                           | *string*                                                         | :heavy_check_mark:                                               | N/A                                                              |
| `content`                                                        | *models.AssistantMessageContent*                                 | :heavy_minus_sign:                                               | N/A                                                              |
| `name`                                                           | *string*                                                         | :heavy_minus_sign:                                               | N/A                                                              |
| `toolCalls`                                                      | [models.ChatMessageToolCall](../models/chatmessagetoolcall.md)[] | :heavy_minus_sign:                                               | N/A                                                              |
| `refusal`                                                        | *string*                                                         | :heavy_minus_sign:                                               | N/A                                                              |
| `reasoning`                                                      | *string*                                                         | :heavy_minus_sign:                                               | N/A                                                              |