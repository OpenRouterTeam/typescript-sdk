# FusionCallInProgressEvent

Emitted when an openrouter:fusion tool call begins executing.

## Example Usage

```typescript
import { FusionCallInProgressEvent } from "@openrouter/sdk/models";

let value: FusionCallInProgressEvent = {
  itemId: "<id>",
  outputIndex: 902434,
  sequenceNumber: 0,
  type: "response.fusion_call.in_progress",
};
```

## Fields

| Field                                | Type                                 | Required                             | Description                          |
| ------------------------------------ | ------------------------------------ | ------------------------------------ | ------------------------------------ |
| `itemId`                             | *string*                             | :heavy_check_mark:                   | N/A                                  |
| `outputIndex`                        | *number*                             | :heavy_check_mark:                   | N/A                                  |
| `sequenceNumber`                     | *number*                             | :heavy_check_mark:                   | N/A                                  |
| `type`                               | *"response.fusion_call.in_progress"* | :heavy_check_mark:                   | N/A                                  |