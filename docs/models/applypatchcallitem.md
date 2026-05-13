# ApplyPatchCallItem

A file create/update/delete via diff patch

## Example Usage

```typescript
import { ApplyPatchCallItem } from "@openrouter/sdk/models";

let value: ApplyPatchCallItem = {
  callId: "call-abc123",
  operation: {
    diff: "--- a\n+++ b\n",
    path: "src/main.ts",
    type: "update_file",
  },
  status: "completed",
  type: "apply_patch_call",
};
```

## Fields

| Field                                                        | Type                                                         | Required                                                     | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `callId`                                                     | *string*                                                     | :heavy_check_mark:                                           | N/A                                                          |
| `id`                                                         | *string*                                                     | :heavy_minus_sign:                                           | N/A                                                          |
| `operation`                                                  | *models.Operation*                                           | :heavy_check_mark:                                           | N/A                                                          |
| `status`                                                     | *models.ApplyPatchCallItemStatusUnion*                       | :heavy_check_mark:                                           | N/A                                                          |
| `type`                                                       | [models.TypeApplyPatchCall](../models/typeapplypatchcall.md) | :heavy_check_mark:                                           | N/A                                                          |