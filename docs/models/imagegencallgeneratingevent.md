# ImageGenCallGeneratingEvent

Image generation call is generating

## Example Usage

```typescript
import { ImageGenCallGeneratingEvent } from "@openrouter/sdk/models";

let value: ImageGenCallGeneratingEvent = {
  type: "response.image_generation_call.generating",
  itemId: "<id>",
  outputIndex: 6728,
  sequenceNumber: 0,
};
```

## Fields

| Field                                         | Type                                          | Required                                      | Description                                   |
| --------------------------------------------- | --------------------------------------------- | --------------------------------------------- | --------------------------------------------- |
| `type`                                        | *"response.image_generation_call.generating"* | :heavy_check_mark:                            | N/A                                           |
| `itemId`                                      | *string*                                      | :heavy_check_mark:                            | N/A                                           |
| `outputIndex`                                 | *number*                                      | :heavy_check_mark:                            | N/A                                           |
| `sequenceNumber`                              | *number*                                      | :heavy_check_mark:                            | N/A                                           |