# FusionCallPanelAddedEvent

Emitted when a fusion analysis-panel model starts.

## Example Usage

```typescript
import { FusionCallPanelAddedEvent } from "@openrouter/sdk/models";

let value: FusionCallPanelAddedEvent = {
  itemId: "<id>",
  model: "Ranchero",
  outputIndex: 348351,
  sequenceNumber: 0,
  type: "response.fusion_call.panel.added",
};
```

## Fields

| Field                                | Type                                 | Required                             | Description                          |
| ------------------------------------ | ------------------------------------ | ------------------------------------ | ------------------------------------ |
| `itemId`                             | *string*                             | :heavy_check_mark:                   | N/A                                  |
| `model`                              | *string*                             | :heavy_check_mark:                   | N/A                                  |
| `outputIndex`                        | *number*                             | :heavy_check_mark:                   | N/A                                  |
| `sequenceNumber`                     | *number*                             | :heavy_check_mark:                   | N/A                                  |
| `type`                               | *"response.fusion_call.panel.added"* | :heavy_check_mark:                   | N/A                                  |