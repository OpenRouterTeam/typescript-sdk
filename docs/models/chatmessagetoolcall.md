# ChatMessageToolCall

Tool call made by the assistant

## Example Usage

```typescript
import { ChatMessageToolCall } from "@openrouter/sdk/models";

let value: ChatMessageToolCall = {
  id: "call_abc123",
  type: "function",
  function: {
    name: "get_current_weather",
    arguments: "{\"location\": \"Boston, MA\"}",
  },
};
```

## Fields

| Field                                                                          | Type                                                                           | Required                                                                       | Description                                                                    |
| ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ |
| `id`                                                                           | *string*                                                                       | :heavy_check_mark:                                                             | Tool call identifier                                                           |
| `type`                                                                         | [models.ChatMessageToolCallType](../models/chatmessagetoolcalltype.md)         | :heavy_check_mark:                                                             | N/A                                                                            |
| `function`                                                                     | [models.ChatMessageToolCallFunction](../models/chatmessagetoolcallfunction.md) | :heavy_check_mark:                                                             | N/A                                                                            |