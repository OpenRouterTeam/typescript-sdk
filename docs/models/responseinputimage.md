# ResponseInputImage

Image input content

## Example Usage

```typescript
import { ResponseInputImage } from "@openrouter/sdk/models";

let value: ResponseInputImage = {
  type: "input_image",
  detail: "auto",
  imageUrl: "https://rubbery-bell.info",
};
```

## Fields

| Field                                                                    | Type                                                                     | Required                                                                 | Description                                                              | Example                                                                  |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------------ |
| `type`                                                                   | [models.ResponseInputImageType](../models/responseinputimagetype.md)     | :heavy_check_mark:                                                       | N/A                                                                      |                                                                          |
| `detail`                                                                 | [models.ResponseInputImageDetail](../models/responseinputimagedetail.md) | :heavy_check_mark:                                                       | N/A                                                                      | auto                                                                     |
| `imageUrl`                                                               | *string*                                                                 | :heavy_minus_sign:                                                       | N/A                                                                      |                                                                          |