# UserMessage

User message

## Example Usage

```typescript
import { UserMessage } from "@openrouter/sdk/models";

let value: UserMessage = {
  role: "user",
  content: "What is the capital of France?",
};
```

## Fields

| Field                          | Type                           | Required                       | Description                    | Example                        |
| ------------------------------ | ------------------------------ | ------------------------------ | ------------------------------ | ------------------------------ |
| `role`                         | *"user"*                       | :heavy_check_mark:             | N/A                            |                                |
| `content`                      | *models.UserMessageContent*    | :heavy_check_mark:             | User message content           | What is the capital of France? |
| `name`                         | *string*                       | :heavy_minus_sign:             | Optional name for the user     | User                           |