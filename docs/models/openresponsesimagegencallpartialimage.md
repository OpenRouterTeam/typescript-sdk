# OpenResponsesImageGenCallPartialImage

Image generation call with partial image

## Example Usage

```typescript
import { OpenResponsesImageGenCallPartialImage } from "@openrouter/sdk/models";

let value: OpenResponsesImageGenCallPartialImage = {
  type: "response.image_generation_call.partial_image",
  itemId: "<id>",
  outputIndex: 2243.31,
  sequenceNumber: 0,
  partialImageB64: "<value>",
  partialImageIndex: 1141.42,
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