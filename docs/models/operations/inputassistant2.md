# InputAssistant2

## Example Usage

```typescript
import { InputAssistant2 } from "@openrouter/sdk/models/operations";

let value: InputAssistant2 = {
  type: "message",
  id: "<id>",
  status: "completed",
  role: "assistant",
  content: [],
};
```

## Fields

| Field                                                                                | Type                                                                                 | Required                                                                             | Description                                                                          |
| ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ |
| `type`                                                                               | [operations.InputTypeMessage4](../../models/operations/inputtypemessage4.md)         | :heavy_check_mark:                                                                   | N/A                                                                                  |
| `id`                                                                                 | *string*                                                                             | :heavy_check_mark:                                                                   | N/A                                                                                  |
| `status`                                                                             | *operations.StatusRequestUnion2*                                                     | :heavy_check_mark:                                                                   | N/A                                                                                  |
| `role`                                                                               | [operations.RoleAssistantRequest3](../../models/operations/roleassistantrequest3.md) | :heavy_check_mark:                                                                   | N/A                                                                                  |
| `content`                                                                            | *operations.ContentRequestUnion5*[]                                                  | :heavy_check_mark:                                                                   | N/A                                                                                  |