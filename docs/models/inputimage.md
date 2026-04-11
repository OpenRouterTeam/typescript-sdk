# InputImage

Image input content item

## Example Usage

```typescript
import { InputImage } from "@openrouter/sdk/models";

let value: InputImage = {
  detail: "auto",
  type: "input_image",
};
```

## Fields

| Field                                                        | Type                                                         | Required                                                     | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `detail`                                                     | [models.InputImageDetail](../models/inputimagedetail.md)     | :heavy_check_mark:                                           | N/A                                                          |
| `imageUrl`                                                   | *string*                                                     | :heavy_minus_sign:                                           | N/A                                                          |
| `type`                                                       | [models.InputImageTypeEnum](../models/inputimagetypeenum.md) | :heavy_check_mark:                                           | N/A                                                          |