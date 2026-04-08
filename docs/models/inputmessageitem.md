# InputMessageItem

## Example Usage

```typescript
import { InputMessageItem } from "@openrouter/sdk/models";

let value: InputMessageItem = {
  role: "user",
};
```

## Fields

| Field                                                                          | Type                                                                           | Required                                                                       | Description                                                                    |
| ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ |
| `content`                                                                      | *models.InputMessageItemContentUnion*[]                                        | :heavy_minus_sign:                                                             | N/A                                                                            |
| `id`                                                                           | *string*                                                                       | :heavy_minus_sign:                                                             | N/A                                                                            |
| `role`                                                                         | *models.InputMessageItemRoleUnion*                                             | :heavy_check_mark:                                                             | N/A                                                                            |
| `type`                                                                         | [models.InputMessageItemTypeMessage](../models/inputmessageitemtypemessage.md) | :heavy_minus_sign:                                                             | N/A                                                                            |