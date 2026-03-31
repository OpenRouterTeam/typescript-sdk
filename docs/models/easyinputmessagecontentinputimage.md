# EasyInputMessageContentInputImage

Image input content item

## Example Usage

```typescript
import { EasyInputMessageContentInputImage } from "@openrouter/sdk/models";

let value: EasyInputMessageContentInputImage = {
  type: "input_image",
  detail: "auto",
};
```

## Fields

| Field                                                                | Type                                                                 | Required                                                             | Description                                                          |
| -------------------------------------------------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------- |
| `type`                                                               | *"input_image"*                                                      | :heavy_check_mark:                                                   | N/A                                                                  |
| `detail`                                                             | [models.EasyInputMessageDetail](../models/easyinputmessagedetail.md) | :heavy_check_mark:                                                   | N/A                                                                  |
| `imageUrl`                                                           | *string*                                                             | :heavy_minus_sign:                                                   | N/A                                                                  |