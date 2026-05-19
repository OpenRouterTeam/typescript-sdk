# ApplyPatchCallOutputItem

Output from an apply patch operation

## Example Usage

```typescript
import { ApplyPatchCallOutputItem } from "@openrouter/sdk/models";

let value: ApplyPatchCallOutputItem = {
  callId: "call-abc123",
  status: "completed",
  type: "apply_patch_call_output",
};
```

## Fields

| Field                                                                            | Type                                                                             | Required                                                                         | Description                                                                      |
| -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `callId`                                                                         | *string*                                                                         | :heavy_check_mark:                                                               | N/A                                                                              |
| `id`                                                                             | *string*                                                                         | :heavy_minus_sign:                                                               | N/A                                                                              |
| `output`                                                                         | *string*                                                                         | :heavy_minus_sign:                                                               | N/A                                                                              |
| `status`                                                                         | *models.ApplyPatchCallOutputItemStatusUnion*                                     | :heavy_check_mark:                                                               | N/A                                                                              |
| `type`                                                                           | [models.ApplyPatchCallOutputItemType](../models/applypatchcalloutputitemtype.md) | :heavy_check_mark:                                                               | N/A                                                                              |