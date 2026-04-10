# ChatSystemMessage

System message for setting behavior

## Example Usage

```typescript
import { ChatSystemMessage } from "@openrouter/sdk/models";

let value: ChatSystemMessage = {
  content: "What is the capital of France?",
  role: "system",
};
```

## Fields

| Field                                | Type                                 | Required                             | Description                          | Example                              |
| ------------------------------------ | ------------------------------------ | ------------------------------------ | ------------------------------------ | ------------------------------------ |
| `content`                            | *models.ChatSystemMessageContent*    | :heavy_check_mark:                   | System message content               | You are a helpful assistant.         |
| `name`                               | *string*                             | :heavy_minus_sign:                   | Optional name for the system message | Assistant Config                     |
| `role`                               | *"system"*                           | :heavy_check_mark:                   | N/A                                  |                                      |