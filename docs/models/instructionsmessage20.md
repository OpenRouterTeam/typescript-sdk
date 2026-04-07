# InstructionsMessage20

## Example Usage

```typescript
import { InstructionsMessage20 } from "@openrouter/sdk/models";

let value: InstructionsMessage20 = {
  id: "<id>",
  role: "developer",
  content: [],
};
```

## Fields

| Field                                                                      | Type                                                                       | Required                                                                   | Description                                                                |
| -------------------------------------------------------------------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| `id`                                                                       | *string*                                                                   | :heavy_check_mark:                                                         | N/A                                                                        |
| `type`                                                                     | [models.InstructionsTypeMessage20](../models/instructionstypemessage20.md) | :heavy_minus_sign:                                                         | N/A                                                                        |
| `role`                                                                     | *models.StreamEventsRoleUnion20*                                           | :heavy_check_mark:                                                         | N/A                                                                        |
| `content`                                                                  | *models.StreamEventsContent30*[]                                           | :heavy_check_mark:                                                         | N/A                                                                        |