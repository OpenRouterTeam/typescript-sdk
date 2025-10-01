# OutputAssistant

## Example Usage

```typescript
import { OutputAssistant } from "@openrouter/sdk/models/operations";

let value: OutputAssistant = {
  type: "message",
  id: "<id>",
  status: "in_progress",
  role: "assistant",
  content: [
    {
      type: "refusal",
      refusal: "<value>",
    },
  ],
};
```

## Fields

| Field                                                                        | Type                                                                         | Required                                                                     | Description                                                                  |
| ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `type`                                                                       | [operations.OutputTypeMessage](../../models/operations/outputtypemessage.md) | :heavy_check_mark:                                                           | N/A                                                                          |
| `id`                                                                         | *string*                                                                     | :heavy_check_mark:                                                           | N/A                                                                          |
| `status`                                                                     | *operations.OutputStatusUnion*                                               | :heavy_check_mark:                                                           | N/A                                                                          |
| `role`                                                                       | [operations.OutputRole](../../models/operations/outputrole.md)               | :heavy_check_mark:                                                           | N/A                                                                          |
| `content`                                                                    | *operations.OutputContentUnion*[]                                            | :heavy_check_mark:                                                           | N/A                                                                          |