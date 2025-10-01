# InstructionsAssistant1

## Example Usage

```typescript
import { InstructionsAssistant1 } from "@openrouter/sdk/models/operations";

let value: InstructionsAssistant1 = {
  type: "message",
  id: "<id>",
  status: "completed",
  role: "assistant",
  content: [],
};
```

## Fields

| Field                                                                                          | Type                                                                                           | Required                                                                                       | Description                                                                                    |
| ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `type`                                                                                         | [operations.InstructionsTypeMessage3](../../models/operations/instructionstypemessage3.md)     | :heavy_check_mark:                                                                             | N/A                                                                                            |
| `id`                                                                                           | *string*                                                                                       | :heavy_check_mark:                                                                             | N/A                                                                                            |
| `status`                                                                                       | *operations.InstructionsStatusUnion1*                                                          | :heavy_check_mark:                                                                             | N/A                                                                                            |
| `role`                                                                                         | [operations.InstructionsRoleAssistant2](../../models/operations/instructionsroleassistant2.md) | :heavy_check_mark:                                                                             | N/A                                                                                            |
| `content`                                                                                      | *operations.InstructionsContentUnion4*[]                                                       | :heavy_check_mark:                                                                             | N/A                                                                                            |