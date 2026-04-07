# InstructionsMessage6

## Example Usage

```typescript
import { InstructionsMessage6 } from "@openrouter/sdk/models";

let value: InstructionsMessage6 = {
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
| `type`                                                                   | [models.InstructionsTypeMessage6](../models/instructionstypemessage6.md) | :heavy_minus_sign:                                                       | N/A                                                                      |
| `role`                                                                   | *models.StreamEventsRoleUnion6*                                          | :heavy_check_mark:                                                       | N/A                                                                      |
| `content`                                                                | *models.StreamEventsContent9*[]                                          | :heavy_check_mark:                                                       | N/A                                                                      |