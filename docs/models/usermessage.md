# UserMessage

## Example Usage

```typescript
import { UserMessage } from "@openrouter/sdk/models";

let value: UserMessage = {
  role: "user",
  content: "<value>",
};
```

## Fields

| Field                       | Type                        | Required                    | Description                 |
| --------------------------- | --------------------------- | --------------------------- | --------------------------- |
| `role`                      | *"user"*                    | :heavy_check_mark:          | N/A                         |
| `content`                   | *models.UserMessageContent* | :heavy_check_mark:          | N/A                         |
| `name`                      | *string*                    | :heavy_minus_sign:          | N/A                         |