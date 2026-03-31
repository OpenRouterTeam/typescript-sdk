# InputMessageItemContentInputImage

Image input content item

## Example Usage

```typescript
import { InputMessageItemContentInputImage } from "@openrouter/sdk/models";

let value: InputMessageItemContentInputImage = {
  type: "input_image",
  detail: "auto",
};
```

## Fields

| Field                                                                | Type                                                                 | Required                                                             | Description                                                          |
| -------------------------------------------------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------- |
| `type`                                                               | *"input_image"*                                                      | :heavy_check_mark:                                                   | N/A                                                                  |
| `detail`                                                             | [models.InputMessageItemDetail](../models/inputmessageitemdetail.md) | :heavy_check_mark:                                                   | N/A                                                                  |
| `imageUrl`                                                           | *string*                                                             | :heavy_minus_sign:                                                   | N/A                                                                  |