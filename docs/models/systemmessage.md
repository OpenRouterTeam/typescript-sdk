# SystemMessage

## Example Usage

```typescript
import { SystemMessage } from "@openrouter/sdk/models";

let value: SystemMessage = {
  role: "system",
  content: [],
};
```

## Fields

| Field                         | Type                          | Required                      | Description                   |
| ----------------------------- | ----------------------------- | ----------------------------- | ----------------------------- |
| `role`                        | *string*                      | :heavy_check_mark:            | N/A                           |
| `content`                     | *models.SystemMessageContent* | :heavy_check_mark:            | N/A                           |
| `name`                        | *string*                      | :heavy_minus_sign:            | N/A                           |