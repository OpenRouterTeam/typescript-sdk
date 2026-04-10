# ChatDeveloperMessage

Developer message

## Example Usage

```typescript
import { ChatDeveloperMessage } from "@openrouter/sdk/models";

let value: ChatDeveloperMessage = {
  content: "What is the capital of France?",
  role: "developer",
};
```

## Fields

| Field                                   | Type                                    | Required                                | Description                             | Example                                 |
| --------------------------------------- | --------------------------------------- | --------------------------------------- | --------------------------------------- | --------------------------------------- |
| `content`                               | *models.ChatDeveloperMessageContent*    | :heavy_check_mark:                      | Developer message content               | This is a message from the developer.   |
| `name`                                  | *string*                                | :heavy_minus_sign:                      | Optional name for the developer message | Developer                               |
| `role`                                  | *"developer"*                           | :heavy_check_mark:                      | N/A                                     |                                         |