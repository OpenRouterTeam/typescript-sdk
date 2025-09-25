# InputMessage1

## Example Usage

```typescript
import { InputMessage1 } from "@openrouter/sdk/models/operations";

let value: InputMessage1 = {
  role: "system",
  content: "<value>",
};
```

## Fields

| Field                                                                        | Type                                                                         | Required                                                                     | Description                                                                  |
| ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `type`                                                                       | [operations.InputTypeMessage1](../../models/operations/inputtypemessage1.md) | :heavy_minus_sign:                                                           | N/A                                                                          |
| `role`                                                                       | *operations.RoleRequestUnion1*                                               | :heavy_check_mark:                                                           | N/A                                                                          |
| `content`                                                                    | *operations.ContentRequestUnion1*                                            | :heavy_check_mark:                                                           | N/A                                                                          |