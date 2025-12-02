# ToolResponseMessage

## Example Usage

```typescript
import { ToolResponseMessage } from "@openrouter/sdk/models";

let value: ToolResponseMessage = {
  role: "tool",
  content: [],
  toolCallId: "<id>",
};
```

## Fields

| Field                               | Type                                | Required                            | Description                         |
| ----------------------------------- | ----------------------------------- | ----------------------------------- | ----------------------------------- |
| `role`                              | *"tool"*                            | :heavy_check_mark:                  | N/A                                 |
| `content`                           | *models.ToolResponseMessageContent* | :heavy_check_mark:                  | N/A                                 |
| `toolCallId`                        | *string*                            | :heavy_check_mark:                  | N/A                                 |