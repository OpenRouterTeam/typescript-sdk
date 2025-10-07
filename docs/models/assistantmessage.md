# AssistantMessage

## Example Usage

```typescript
import { AssistantMessage } from "@openrouter/sdk/models";

let value: AssistantMessage = {
  role: "assistant",
  content: "<value>",
  name: "<value>",
  toolCalls: [
    {
      id: "<id>",
      type: "function",
      function: {
        name: "<value>",
        arguments: "<value>",
      },
    },
  ],
  refusal: "<value>",
  reasoning: "<value>",
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