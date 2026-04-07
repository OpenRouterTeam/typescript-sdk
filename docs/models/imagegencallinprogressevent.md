# ImageGenCallInProgressEvent

Image generation call in progress

## Example Usage

```typescript
import { ImageGenCallInProgressEvent } from "@openrouter/sdk/models";

let value: ImageGenCallInProgressEvent = {
  type: "response.image_generation_call.in_progress",
  itemId: "<id>",
  outputIndex: 654313,
  sequenceNumber: 0,
};
```

## Fields

| Field                                          | Type                                           | Required                                       | Description                                    |
| ---------------------------------------------- | ---------------------------------------------- | ---------------------------------------------- | ---------------------------------------------- |
| `type`                                         | *"response.image_generation_call.in_progress"* | :heavy_check_mark:                             | N/A                                            |
| `itemId`                                       | *string*                                       | :heavy_check_mark:                             | N/A                                            |
| `outputIndex`                                  | *number*                                       | :heavy_check_mark:                             | N/A                                            |
| `sequenceNumber`                               | *number*                                       | :heavy_check_mark:                             | N/A                                            |