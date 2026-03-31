# ImageGenCallPartialImageEvent

Image generation call with partial image

## Example Usage

```typescript
import { ImageGenCallPartialImageEvent } from "@openrouter/sdk/models";

let value: ImageGenCallPartialImageEvent = {
  type: "response.image_generation_call.partial_image",
  itemId: "<id>",
  outputIndex: 4744.97,
  sequenceNumber: 0,
  partialImageB64: "<value>",
  partialImageIndex: 1246.36,
};
```

## Fields

| Field                                            | Type                                             | Required                                         | Description                                      |
| ------------------------------------------------ | ------------------------------------------------ | ------------------------------------------------ | ------------------------------------------------ |
| `type`                                           | *"response.image_generation_call.partial_image"* | :heavy_check_mark:                               | N/A                                              |
| `itemId`                                         | *string*                                         | :heavy_check_mark:                               | N/A                                              |
| `outputIndex`                                    | *number*                                         | :heavy_check_mark:                               | N/A                                              |
| `sequenceNumber`                                 | *number*                                         | :heavy_check_mark:                               | N/A                                              |
| `partialImageB64`                                | *string*                                         | :heavy_check_mark:                               | N/A                                              |
| `partialImageIndex`                              | *number*                                         | :heavy_check_mark:                               | N/A                                              |