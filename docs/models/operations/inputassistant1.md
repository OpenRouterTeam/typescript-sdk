# InputAssistant1

## Example Usage

```typescript
import { InputAssistant1 } from "@openrouter/sdk/models/operations";

let value: InputAssistant1 = {
  type: "message",
  id: "<id>",
  status: "in_progress",
  role: "assistant",
  content: [],
};
```

## Fields

| Field                                                                                | Type                                                                                 | Required                                                                             | Description                                                                          |
| ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ |
| `type`                                                                               | [operations.InputTypeMessage3](../../models/operations/inputtypemessage3.md)         | :heavy_check_mark:                                                                   | N/A                                                                                  |
| `id`                                                                                 | *string*                                                                             | :heavy_check_mark:                                                                   | N/A                                                                                  |
| `status`                                                                             | *operations.StatusRequestUnion1*                                                     | :heavy_check_mark:                                                                   | N/A                                                                                  |
| `role`                                                                               | [operations.RoleAssistantRequest2](../../models/operations/roleassistantrequest2.md) | :heavy_check_mark:                                                                   | N/A                                                                                  |
| `content`                                                                            | *operations.ContentRequestUnion4*[]                                                  | :heavy_check_mark:                                                                   | N/A                                                                                  |