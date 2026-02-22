# SystemMessage

System message for setting behavior

## Example Usage

```typescript
import { SystemMessage } from "@openrouter/sdk/models";

let value: SystemMessage = {
  role: "system",
  content: "What is the capital of France?",
};
```

## Fields

| Field                                | Type                                 | Required                             | Description                          | Example                              |
| ------------------------------------ | ------------------------------------ | ------------------------------------ | ------------------------------------ | ------------------------------------ |
| `role`                               | *"system"*                           | :heavy_check_mark:                   | N/A                                  |                                      |
| `content`                            | *models.SystemMessageContent*        | :heavy_check_mark:                   | System message content               | You are a helpful assistant.         |
| `name`                               | *string*                             | :heavy_minus_sign:                   | Optional name for the system message | Assistant Config                     |