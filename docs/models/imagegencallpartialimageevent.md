# ImageGenCallPartialImageEvent

Image generation call with partial image

## Example Usage

```typescript
import { ImageGenCallPartialImageEvent } from "@openrouter/sdk/models";

let value: ImageGenCallPartialImageEvent = {
  itemId: "<id>",
  outputIndex: 474497,
  partialImageB64: "<value>",
  partialImageIndex: 124636,
  sequenceNumber: 0,
  type: "response.image_generation_call.partial_image",
};
```

## Fields

| Field                                            | Type                                             | Required                                         | Description                                      |
| ------------------------------------------------ | ------------------------------------------------ | ------------------------------------------------ | ------------------------------------------------ |
| `itemId`                                         | *string*                                         | :heavy_check_mark:                               | N/A                                              |
| `outputIndex`                                    | *number*                                         | :heavy_check_mark:                               | N/A                                              |
| `partialImageB64`                                | *string*                                         | :heavy_check_mark:                               | N/A                                              |
| `partialImageIndex`                              | *number*                                         | :heavy_check_mark:                               | N/A                                              |
| `sequenceNumber`                                 | *number*                                         | :heavy_check_mark:                               | N/A                                              |
| `type`                                           | *"response.image_generation_call.partial_image"* | :heavy_check_mark:                               | N/A                                              |