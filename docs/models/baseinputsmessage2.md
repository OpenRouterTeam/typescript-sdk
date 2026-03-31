# BaseInputsMessage2

## Example Usage

```typescript
import { BaseInputsMessage2 } from "@openrouter/sdk/models";

let value: BaseInputsMessage2 = {
  id: "<id>",
  role: "system",
  content: [
    {
      type: "input_text",
      text: "Hello, how can I help you?",
    },
  ],
};
```

## Fields

| Field                                                                | Type                                                                 | Required                                                             | Description                                                          |
| -------------------------------------------------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------- |
| `id`                                                                 | *string*                                                             | :heavy_check_mark:                                                   | N/A                                                                  |
| `type`                                                               | [models.BaseInputsTypeMessage2](../models/baseinputstypemessage2.md) | :heavy_minus_sign:                                                   | N/A                                                                  |
| `role`                                                               | *models.BaseInputsRoleUnion2*                                        | :heavy_check_mark:                                                   | N/A                                                                  |
| `content`                                                            | *models.BaseInputsContent3*[]                                        | :heavy_check_mark:                                                   | N/A                                                                  |