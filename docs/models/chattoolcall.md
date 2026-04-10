# ChatToolCall

Tool call made by the assistant

## Example Usage

```typescript
import { ChatToolCall } from "@openrouter/sdk/models";

let value: ChatToolCall = {
  function: {
    arguments: "{\"location\": \"Boston, MA\"}",
    name: "get_current_weather",
  },
  id: "call_abc123",
  type: "function",
};
```

## Fields

| Field                                                            | Type                                                             | Required                                                         | Description                                                      |
| ---------------------------------------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------- |
| `function`                                                       | [models.ChatToolCallFunction](../models/chattoolcallfunction.md) | :heavy_check_mark:                                               | N/A                                                              |
| `id`                                                             | *string*                                                         | :heavy_check_mark:                                               | Tool call identifier                                             |
| `type`                                                           | [models.ChatToolCallType](../models/chattoolcalltype.md)         | :heavy_check_mark:                                               | N/A                                                              |