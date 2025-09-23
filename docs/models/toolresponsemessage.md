# ToolResponseMessage

## Example Usage

```typescript
import { ToolResponseMessage } from "openrouter/models";

let value: ToolResponseMessage = {
  role: "tool",
  content: [],
  toolCallId: "<id>",
};
```

## Fields

| Field                               | Type                                | Required                            | Description                         |
| ----------------------------------- | ----------------------------------- | ----------------------------------- | ----------------------------------- |
| `role`                              | *string*                            | :heavy_check_mark:                  | N/A                                 |
| `content`                           | *models.ToolResponseMessageContent* | :heavy_check_mark:                  | N/A                                 |
| `toolCallId`                        | *string*                            | :heavy_check_mark:                  | N/A                                 |