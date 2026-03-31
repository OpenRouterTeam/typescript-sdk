# ChatToolCall

Tool call made by the assistant

## Example Usage

```typescript
import { ChatToolCall } from "@openrouter/sdk/models";

let value: ChatToolCall = {
  id: "call_abc123",
  type: "function",
  function: {
    name: "get_current_weather",
    arguments: "{\"location\": \"Boston, MA\"}",
  },
};
```

## Fields

| Field                                                            | Type                                                             | Required                                                         | Description                                                      |
| ---------------------------------------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------- |
| `id`                                                             | *string*                                                         | :heavy_check_mark:                                               | Tool call identifier                                             |
| `type`                                                           | [models.ChatToolCallType](../models/chattoolcalltype.md)         | :heavy_check_mark:                                               | N/A                                                              |
| `function`                                                       | [models.ChatToolCallFunction](../models/chattoolcallfunction.md) | :heavy_check_mark:                                               | N/A                                                              |