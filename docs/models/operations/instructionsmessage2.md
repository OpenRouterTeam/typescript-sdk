# InstructionsMessage2

## Example Usage

```typescript
import { InstructionsMessage2 } from "@openrouter/sdk/models/operations";

let value: InstructionsMessage2 = {
  id: "<id>",
  role: "system",
  content: [],
};
```

## Fields

| Field                                                                                      | Type                                                                                       | Required                                                                                   | Description                                                                                |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| `id`                                                                                       | *string*                                                                                   | :heavy_check_mark:                                                                         | N/A                                                                                        |
| `type`                                                                                     | [operations.InstructionsTypeMessage2](../../models/operations/instructionstypemessage2.md) | :heavy_minus_sign:                                                                         | N/A                                                                                        |
| `role`                                                                                     | *operations.InstructionsRoleUnion2*                                                        | :heavy_check_mark:                                                                         | N/A                                                                                        |
| `content`                                                                                  | *operations.InstructionsContentUnion3*[]                                                   | :heavy_check_mark:                                                                         | N/A                                                                                        |