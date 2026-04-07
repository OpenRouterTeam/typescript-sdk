# InstructionsMessage8

## Example Usage

```typescript
import { InstructionsMessage8 } from "@openrouter/sdk/models";

let value: InstructionsMessage8 = {
  id: "<id>",
  role: "developer",
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
| `type`                                                                   | [models.InstructionsTypeMessage8](../models/instructionstypemessage8.md) | :heavy_minus_sign:                                                       | N/A                                                                      |
| `role`                                                                   | *models.StreamEventsRoleUnion8*                                          | :heavy_check_mark:                                                       | N/A                                                                      |
| `content`                                                                | *models.StreamEventsContent12*[]                                         | :heavy_check_mark:                                                       | N/A                                                                      |