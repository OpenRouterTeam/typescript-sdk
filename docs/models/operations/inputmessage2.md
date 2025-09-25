# InputMessage2

## Example Usage

```typescript
import { InputMessage2 } from "@openrouter/sdk/models/operations";

let value: InputMessage2 = {
  id: "<id>",
  role: "user",
  content: [],
};
```

## Fields

| Field                                                                        | Type                                                                         | Required                                                                     | Description                                                                  |
| ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `id`                                                                         | *string*                                                                     | :heavy_check_mark:                                                           | N/A                                                                          |
| `type`                                                                       | [operations.InputTypeMessage2](../../models/operations/inputtypemessage2.md) | :heavy_minus_sign:                                                           | N/A                                                                          |
| `role`                                                                       | *operations.RoleRequestUnion2*                                               | :heavy_check_mark:                                                           | N/A                                                                          |
| `content`                                                                    | *operations.ContentRequestUnion3*[]                                          | :heavy_check_mark:                                                           | N/A                                                                          |