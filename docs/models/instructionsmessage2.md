# InstructionsMessage2

## Example Usage

```typescript
import { InstructionsMessage2 } from "@openrouter/sdk/models";

let value: InstructionsMessage2 = {
  id: "<id>",
  type: "message",
  role: "system",
  content: [],
};
```

## Fields

| Field                                                                    | Type                                                                     | Required                                                                 | Description                                                              |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------------ |
| `id`                                                                     | *string*                                                                 | :heavy_check_mark:                                                       | N/A                                                                      |
| `type`                                                                   | [models.InstructionsTypeMessage2](../models/instructionstypemessage2.md) | :heavy_minus_sign:                                                       | N/A                                                                      |
| `role`                                                                   | *models.OpenResponsesNonStreamingResponseRoleUnion2*                     | :heavy_check_mark:                                                       | N/A                                                                      |
| `content`                                                                | *models.OpenResponsesNonStreamingResponseContent3*[]                     | :heavy_check_mark:                                                       | N/A                                                                      |