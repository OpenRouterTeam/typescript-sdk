# ResponseInputImage

Image input content item

## Example Usage

```typescript
import { ResponseInputImage } from "@openrouter/sdk/models";

let value: ResponseInputImage = {
  type: "input_image",
  detail: "auto",
  imageUrl: "https://example.com/image.jpg",
};
```

## Fields

| Field                                                                    | Type                                                                     | Required                                                                 | Description                                                              |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------------ |
| `type`                                                                   | [models.ResponseInputImageType](../models/responseinputimagetype.md)     | :heavy_check_mark:                                                       | N/A                                                                      |
| `detail`                                                                 | [models.ResponseInputImageDetail](../models/responseinputimagedetail.md) | :heavy_check_mark:                                                       | N/A                                                                      |
| `imageUrl`                                                               | *string*                                                                 | :heavy_minus_sign:                                                       | N/A                                                                      |