# InstructionsMessage4

## Example Usage

```typescript
import { InstructionsMessage4 } from "@openrouter/sdk/models";

let value: InstructionsMessage4 = {
  id: "<id>",
  role: "user",
  content: [
    {
      type: "input_text",
      text: "Hello, how can I help you?",
    },
  ],
};
```

## Fields

| Field                                                                    | Type                                                                     | Required                                                                 | Description                                                              |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------------ |
| `id`                                                                     | *string*                                                                 | :heavy_check_mark:                                                       | N/A                                                                      |
| `type`                                                                   | [models.InstructionsTypeMessage4](../models/instructionstypemessage4.md) | :heavy_minus_sign:                                                       | N/A                                                                      |
| `role`                                                                   | *models.StreamEventsRoleUnion4*                                          | :heavy_check_mark:                                                       | N/A                                                                      |
| `content`                                                                | *models.StreamEventsContent6*[]                                          | :heavy_check_mark:                                                       | N/A                                                                      |