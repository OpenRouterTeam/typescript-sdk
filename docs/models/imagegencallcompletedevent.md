# ImageGenCallCompletedEvent

Image generation call completed

## Example Usage

```typescript
import { ImageGenCallCompletedEvent } from "@openrouter/sdk/models";

let value: ImageGenCallCompletedEvent = {
  type: "response.image_generation_call.completed",
  itemId: "<id>",
  outputIndex: 569.29,
  sequenceNumber: 0,
};
```

## Fields

| Field                                        | Type                                         | Required                                     | Description                                  |
| -------------------------------------------- | -------------------------------------------- | -------------------------------------------- | -------------------------------------------- |
| `type`                                       | *"response.image_generation_call.completed"* | :heavy_check_mark:                           | N/A                                          |
| `itemId`                                     | *string*                                     | :heavy_check_mark:                           | N/A                                          |
| `outputIndex`                                | *number*                                     | :heavy_check_mark:                           | N/A                                          |
| `sequenceNumber`                             | *number*                                     | :heavy_check_mark:                           | N/A                                          |