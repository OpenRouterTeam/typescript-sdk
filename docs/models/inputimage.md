# InputImage

Image input content item

## Example Usage

```typescript
import { InputImage } from "@openrouter/sdk/models";

let value: InputImage = {
  type: "input_image",
  detail: "auto",
};
```

## Fields

| Field                                                        | Type                                                         | Required                                                     | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `type`                                                       | [models.InputImageTypeEnum](../models/inputimagetypeenum.md) | :heavy_check_mark:                                           | N/A                                                          |
| `detail`                                                     | [models.InputImageDetail](../models/inputimagedetail.md)     | :heavy_check_mark:                                           | N/A                                                          |
| `imageUrl`                                                   | *string*                                                     | :heavy_minus_sign:                                           | N/A                                                          |