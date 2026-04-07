# InstructionsMessage17

## Example Usage

```typescript
import { InstructionsMessage17 } from "@openrouter/sdk/models";

let value: InstructionsMessage17 = {
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
| `type`                                                                     | [models.InstructionsTypeMessage17](../models/instructionstypemessage17.md) | :heavy_minus_sign:                                                         | N/A                                                                        |
| `role`                                                                     | *models.StreamEventsRoleUnion17*                                           | :heavy_check_mark:                                                         | N/A                                                                        |
| `content`                                                                  | *models.StreamEventsContent26*                                             | :heavy_check_mark:                                                         | N/A                                                                        |
| `phase`                                                                    | *models.StreamEventsPhaseUnion9*                                           | :heavy_minus_sign:                                                         | N/A                                                                        |