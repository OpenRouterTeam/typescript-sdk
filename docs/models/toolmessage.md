# ToolMessage

## Example Usage

```typescript
import { ToolMessage } from "@openrouter/sdk/models";

let value: ToolMessage = {
  role: "tool",
  content: [],
  toolCallId: "<id>",
};
```

## Fields

| Field                       | Type                        | Required                    | Description                 |
| --------------------------- | --------------------------- | --------------------------- | --------------------------- |
| `role`                      | *string*                    | :heavy_check_mark:          | N/A                         |
| `content`                   | *models.ToolMessageContent* | :heavy_check_mark:          | N/A                         |
| `toolCallId`                | *string*                    | :heavy_check_mark:          | N/A                         |