# BaseInputsMessage

## Example Usage

```typescript
import { BaseInputsMessage } from "@openrouter/sdk/models";

let value: BaseInputsMessage = {
  role: "assistant",
  content: [],
};
```

## Fields

| Field                                                | Type                                                 | Required                                             | Description                                          |
| ---------------------------------------------------- | ---------------------------------------------------- | ---------------------------------------------------- | ---------------------------------------------------- |
| `type`                                               | [models.BaseInputsType](../models/baseinputstype.md) | :heavy_minus_sign:                                   | N/A                                                  |
| `role`                                               | *models.BaseInputsRoleUnion*                         | :heavy_check_mark:                                   | N/A                                                  |
| `content`                                            | *models.BaseInputsContent2*                          | :heavy_check_mark:                                   | N/A                                                  |
| `phase`                                              | *models.BaseInputsPhaseUnion*                        | :heavy_minus_sign:                                   | N/A                                                  |