# ImageGenCallGeneratingEvent

Image generation call is generating

## Example Usage

```typescript
import { ImageGenCallGeneratingEvent } from "@openrouter/sdk/models";

let value: ImageGenCallGeneratingEvent = {
  itemId: "<id>",
  outputIndex: 672800,
  sequenceNumber: 0,
  type: "response.image_generation_call.generating",
};
```

## Fields

| Field                                         | Type                                          | Required                                      | Description                                   |
| --------------------------------------------- | --------------------------------------------- | --------------------------------------------- | --------------------------------------------- |
| `itemId`                                      | *string*                                      | :heavy_check_mark:                            | N/A                                           |
| `outputIndex`                                 | *number*                                      | :heavy_check_mark:                            | N/A                                           |
| `sequenceNumber`                              | *number*                                      | :heavy_check_mark:                            | N/A                                           |
| `type`                                        | *"response.image_generation_call.generating"* | :heavy_check_mark:                            | N/A                                           |