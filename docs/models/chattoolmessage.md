# ChatToolMessage

Tool response message

## Example Usage

```typescript
import { ChatToolMessage } from "@openrouter/sdk/models";

let value: ChatToolMessage = {
  content: "What is the capital of France?",
  role: "tool",
  toolCallId: "call_abc123",
};
```

## Fields

| Field                                                          | Type                                                           | Required                                                       | Description                                                    | Example                                                        |
| -------------------------------------------------------------- | -------------------------------------------------------------- | -------------------------------------------------------------- | -------------------------------------------------------------- | -------------------------------------------------------------- |
| `content`                                                      | *models.ChatToolMessageContent*                                | :heavy_check_mark:                                             | Tool response content                                          | The weather in San Francisco is 72°F and sunny.                |
| `role`                                                         | *"tool"*                                                       | :heavy_check_mark:                                             | N/A                                                            |                                                                |
| `toolCallId`                                                   | *string*                                                       | :heavy_check_mark:                                             | ID of the assistant message tool call this message responds to | call_abc123                                                    |