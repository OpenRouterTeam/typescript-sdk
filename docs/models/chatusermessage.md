# ChatUserMessage

User message

## Example Usage

```typescript
import { ChatUserMessage } from "@openrouter/sdk/models";

let value: ChatUserMessage = {
  content: "What is the capital of France?",
  role: "user",
};
```

## Fields

| Field                           | Type                            | Required                        | Description                     | Example                         |
| ------------------------------- | ------------------------------- | ------------------------------- | ------------------------------- | ------------------------------- |
| `content`                       | *models.ChatUserMessageContent* | :heavy_check_mark:              | User message content            | What is the capital of France?  |
| `name`                          | *string*                        | :heavy_minus_sign:              | Optional name for the user      | User                            |
| `role`                          | *"user"*                        | :heavy_check_mark:              | N/A                             |                                 |