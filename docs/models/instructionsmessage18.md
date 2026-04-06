# InstructionsMessage18

## Example Usage

```typescript
import { InstructionsMessage18 } from "@openrouter/sdk/models";

let value: InstructionsMessage18 = {
  id: "<id>",
  role: "developer",
  content: [],
};
```

## Fields

| Field                                                                      | Type                                                                       | Required                                                                   | Description                                                                |
| -------------------------------------------------------------------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| `id`                                                                       | *string*                                                                   | :heavy_check_mark:                                                         | N/A                                                                        |
| `type`                                                                     | [models.InstructionsTypeMessage18](../models/instructionstypemessage18.md) | :heavy_minus_sign:                                                         | N/A                                                                        |
| `role`                                                                     | *models.StreamEventsRoleUnion18*                                           | :heavy_check_mark:                                                         | N/A                                                                        |
| `content`                                                                  | *models.StreamEventsContent27*[]                                           | :heavy_check_mark:                                                         | N/A                                                                        |