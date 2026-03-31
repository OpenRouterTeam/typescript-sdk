# ChatUserMessage

User message

## Example Usage

```typescript
import { ChatUserMessage } from "@openrouter/sdk/models";

let value: ChatUserMessage = {
  role: "user",
  content: "What is the capital of France?",
};
```

## Fields

| Field                           | Type                            | Required                        | Description                     | Example                         |
| ------------------------------- | ------------------------------- | ------------------------------- | ------------------------------- | ------------------------------- |
| `role`                          | *"user"*                        | :heavy_check_mark:              | N/A                             |                                 |
| `content`                       | *models.ChatUserMessageContent* | :heavy_check_mark:              | User message content            | What is the capital of France?  |
| `name`                          | *string*                        | :heavy_minus_sign:              | Optional name for the user      | User                            |