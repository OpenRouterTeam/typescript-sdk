# InstructionsMessage12

## Example Usage

```typescript
import { InstructionsMessage12 } from "@openrouter/sdk/models";

let value: InstructionsMessage12 = {
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

| Field                                                                      | Type                                                                       | Required                                                                   | Description                                                                |
| -------------------------------------------------------------------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| `id`                                                                       | *string*                                                                   | :heavy_check_mark:                                                         | N/A                                                                        |
| `type`                                                                     | [models.InstructionsTypeMessage12](../models/instructionstypemessage12.md) | :heavy_minus_sign:                                                         | N/A                                                                        |
| `role`                                                                     | *models.StreamEventsRoleUnion12*                                           | :heavy_check_mark:                                                         | N/A                                                                        |
| `content`                                                                  | *models.StreamEventsContent18*[]                                           | :heavy_check_mark:                                                         | N/A                                                                        |