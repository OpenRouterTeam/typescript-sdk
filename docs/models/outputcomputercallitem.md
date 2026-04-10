# OutputComputerCallItem

## Example Usage

```typescript
import { OutputComputerCallItem } from "@openrouter/sdk/models";

let value: OutputComputerCallItem = {
  callId: "<id>",
  pendingSafetyChecks: [],
  status: "completed",
  type: "computer_call",
};
```

## Fields

| Field                                                                            | Type                                                                             | Required                                                                         | Description                                                                      |
| -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `action`                                                                         | *any*                                                                            | :heavy_minus_sign:                                                               | N/A                                                                              |
| `callId`                                                                         | *string*                                                                         | :heavy_check_mark:                                                               | N/A                                                                              |
| `id`                                                                             | *string*                                                                         | :heavy_minus_sign:                                                               | N/A                                                                              |
| `pendingSafetyChecks`                                                            | [models.PendingSafetyCheck](../models/pendingsafetycheck.md)[]                   | :heavy_check_mark:                                                               | N/A                                                                              |
| `status`                                                                         | [models.OutputComputerCallItemStatus](../models/outputcomputercallitemstatus.md) | :heavy_check_mark:                                                               | N/A                                                                              |
| `type`                                                                           | *"computer_call"*                                                                | :heavy_check_mark:                                                               | N/A                                                                              |