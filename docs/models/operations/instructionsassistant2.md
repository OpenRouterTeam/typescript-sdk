# InstructionsAssistant2

## Example Usage

```typescript
import { InstructionsAssistant2 } from "@openrouter/sdk/models/operations";

let value: InstructionsAssistant2 = {
  type: "message",
  id: "<id>",
  status: "incomplete",
  role: "assistant",
  content: [],
};
```

## Fields

| Field                                                                                          | Type                                                                                           | Required                                                                                       | Description                                                                                    |
| ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `type`                                                                                         | [operations.InstructionsTypeMessage4](../../models/operations/instructionstypemessage4.md)     | :heavy_check_mark:                                                                             | N/A                                                                                            |
| `id`                                                                                           | *string*                                                                                       | :heavy_check_mark:                                                                             | N/A                                                                                            |
| `status`                                                                                       | *operations.InstructionsStatusUnion2*                                                          | :heavy_check_mark:                                                                             | N/A                                                                                            |
| `role`                                                                                         | [operations.InstructionsRoleAssistant3](../../models/operations/instructionsroleassistant3.md) | :heavy_check_mark:                                                                             | N/A                                                                                            |
| `content`                                                                                      | *operations.InstructionsContentUnion5*[]                                                       | :heavy_check_mark:                                                                             | N/A                                                                                            |