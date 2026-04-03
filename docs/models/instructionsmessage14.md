# InstructionsMessage14

## Example Usage

```typescript
import { InstructionsMessage14 } from "@openrouter/sdk/models";

let value: InstructionsMessage14 = {
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

| Field                                                                      | Type                                                                       | Required                                                                   | Description                                                                |
| -------------------------------------------------------------------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| `id`                                                                       | *string*                                                                   | :heavy_check_mark:                                                         | N/A                                                                        |
| `type`                                                                     | [models.InstructionsTypeMessage14](../models/instructionstypemessage14.md) | :heavy_minus_sign:                                                         | N/A                                                                        |
| `role`                                                                     | *models.StreamEventsRoleUnion14*                                           | :heavy_check_mark:                                                         | N/A                                                                        |
| `content`                                                                  | *models.StreamEventsContent21*[]                                           | :heavy_check_mark:                                                         | N/A                                                                        |