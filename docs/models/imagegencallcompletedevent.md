# ImageGenCallCompletedEvent

Image generation call completed

## Example Usage

```typescript
import { ImageGenCallCompletedEvent } from "@openrouter/sdk/models";

let value: ImageGenCallCompletedEvent = {
  itemId: "<id>",
  outputIndex: 56929,
  sequenceNumber: 0,
  type: "response.image_generation_call.completed",
};
```

## Fields

| Field                                        | Type                                         | Required                                     | Description                                  |
| -------------------------------------------- | -------------------------------------------- | -------------------------------------------- | -------------------------------------------- |
| `itemId`                                     | *string*                                     | :heavy_check_mark:                           | N/A                                          |
| `outputIndex`                                | *number*                                     | :heavy_check_mark:                           | N/A                                          |
| `sequenceNumber`                             | *number*                                     | :heavy_check_mark:                           | N/A                                          |
| `type`                                       | *"response.image_generation_call.completed"* | :heavy_check_mark:                           | N/A                                          |