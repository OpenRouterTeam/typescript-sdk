# InstructionsMessage16

## Example Usage

```typescript
import { InstructionsMessage16 } from "@openrouter/sdk/models";

let value: InstructionsMessage16 = {
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
| `type`                                                                     | [models.InstructionsTypeMessage16](../models/instructionstypemessage16.md) | :heavy_minus_sign:                                                         | N/A                                                                        |
| `role`                                                                     | *models.StreamEventsRoleUnion16*                                           | :heavy_check_mark:                                                         | N/A                                                                        |
| `content`                                                                  | *models.StreamEventsContent24*[]                                           | :heavy_check_mark:                                                         | N/A                                                                        |