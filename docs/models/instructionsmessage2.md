# InstructionsMessage2

## Example Usage

```typescript
import { InstructionsMessage2 } from "@openrouter/sdk/models";

let value: InstructionsMessage2 = {
  role: "assistant",
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
| `type`                                                                   | [models.InstructionsTypeMessage2](../models/instructionstypemessage2.md) | :heavy_minus_sign:                                                       | N/A                                                                      |
| `role`                                                                   | *models.StreamEventsRoleUnion2*                                          | :heavy_check_mark:                                                       | N/A                                                                      |
| `content`                                                                | *models.StreamEventsContent4*                                            | :heavy_check_mark:                                                       | N/A                                                                      |
| `phase`                                                                  | *models.StreamEventsPhaseUnion2*                                         | :heavy_minus_sign:                                                       | N/A                                                                      |