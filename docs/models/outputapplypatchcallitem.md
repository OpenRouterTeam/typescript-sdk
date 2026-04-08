# OutputApplyPatchCallItem

An output item representing an apply_patch tool call

## Example Usage

```typescript
import { OutputApplyPatchCallItem } from "@openrouter/sdk/models";

let value: OutputApplyPatchCallItem = {
  type: "apply_patch_call",
  id: "msg-abc123",
  callId: "<id>",
  operation: {
    type: "create_file",
    path: "/var/mail",
    diff: "<value>",
  },
  status: "completed",
};
```

## Fields

| Field                                                        | Type                                                         | Required                                                     | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `type`                                                       | [models.TypeApplyPatchCall](../models/typeapplypatchcall.md) | :heavy_check_mark:                                           | N/A                                                          |
| `id`                                                         | *string*                                                     | :heavy_check_mark:                                           | N/A                                                          |
| `callId`                                                     | *string*                                                     | :heavy_check_mark:                                           | N/A                                                          |
| `operation`                                                  | *models.Operation*                                           | :heavy_check_mark:                                           | N/A                                                          |
| `status`                                                     | *models.OutputApplyPatchCallItemStatusUnion*                 | :heavy_check_mark:                                           | N/A                                                          |