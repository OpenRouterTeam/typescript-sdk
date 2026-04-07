# BaseResponseInputMessageItem

## Example Usage

```typescript
import { BaseResponseInputMessageItem } from "@openrouter/sdk/models";

let value: BaseResponseInputMessageItem = {
  id: "<id>",
  role: "system",
  content: [],
};
```

## Fields

| Field                                                                                    | Type                                                                                     | Required                                                                                 | Description                                                                              |
| ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `id`                                                                                     | *string*                                                                                 | :heavy_check_mark:                                                                       | N/A                                                                                      |
| `type`                                                                                   | [models.BaseResponseInputMessageItemType](../models/baseresponseinputmessageitemtype.md) | :heavy_minus_sign:                                                                       | N/A                                                                                      |
| `role`                                                                                   | *models.BaseResponseInputMessageItemRoleUnion*                                           | :heavy_check_mark:                                                                       | N/A                                                                                      |
| `content`                                                                                | *models.BaseResponseInputMessageItemContent*[]                                           | :heavy_check_mark:                                                                       | N/A                                                                                      |