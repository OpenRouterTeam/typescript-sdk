# ChatSystemMessage

System message for setting behavior

## Example Usage

```typescript
import { ChatSystemMessage } from "@openrouter/sdk/models";

let value: ChatSystemMessage = {
  role: "system",
  content: "What is the capital of France?",
};
```

## Fields

| Field                                | Type                                 | Required                             | Description                          | Example                              |
| ------------------------------------ | ------------------------------------ | ------------------------------------ | ------------------------------------ | ------------------------------------ |
| `role`                               | *"system"*                           | :heavy_check_mark:                   | N/A                                  |                                      |
| `content`                            | *models.ChatSystemMessageContent*    | :heavy_check_mark:                   | System message content               | You are a helpful assistant.         |
| `name`                               | *string*                             | :heavy_minus_sign:                   | Optional name for the system message | Assistant Config                     |