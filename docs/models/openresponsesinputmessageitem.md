# OpenResponsesInputMessageItem

## Example Usage

```typescript
import { OpenResponsesInputMessageItem } from "@openrouter/sdk/models";

let value: OpenResponsesInputMessageItem = {
  role: "system",
};
```

## Fields

| Field                                                                                                    | Type                                                                                                     | Required                                                                                                 | Description                                                                                              |
| -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `id`                                                                                                     | *string*                                                                                                 | :heavy_minus_sign:                                                                                       | N/A                                                                                                      |
| `type`                                                                                                   | [models.OpenResponsesInputMessageItemTypeMessage](../models/openresponsesinputmessageitemtypemessage.md) | :heavy_minus_sign:                                                                                       | N/A                                                                                                      |
| `role`                                                                                                   | *models.OpenResponsesInputMessageItemRoleUnion*                                                          | :heavy_check_mark:                                                                                       | N/A                                                                                                      |
| `content`                                                                                                | *models.OpenResponsesInputMessageItemContentUnion*[]                                                     | :heavy_minus_sign:                                                                                       | N/A                                                                                                      |