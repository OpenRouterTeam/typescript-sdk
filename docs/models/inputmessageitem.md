# InputMessageItem

## Example Usage

```typescript
import { InputMessageItem } from "@openrouter/sdk/models";

let value: InputMessageItem = {
  role: "system",
};
```

## Fields

| Field                                                                          | Type                                                                           | Required                                                                       | Description                                                                    |
| ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ |
| `id`                                                                           | *string*                                                                       | :heavy_minus_sign:                                                             | N/A                                                                            |
| `type`                                                                         | [models.InputMessageItemTypeMessage](../models/inputmessageitemtypemessage.md) | :heavy_minus_sign:                                                             | N/A                                                                            |
| `role`                                                                         | *models.InputMessageItemRoleUnion*                                             | :heavy_check_mark:                                                             | N/A                                                                            |
| `content`                                                                      | *models.InputMessageItemContentUnion*[]                                        | :heavy_minus_sign:                                                             | N/A                                                                            |