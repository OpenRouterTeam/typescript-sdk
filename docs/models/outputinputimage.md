# OutputInputImage

Image input content item

## Example Usage

```typescript
import { OutputInputImage } from "@openrouter/sdk/models";

let value: OutputInputImage = {
  detail: "auto",
  type: "input_image",
};
```

## Fields

| Field                                                                            | Type                                                                             | Required                                                                         | Description                                                                      |
| -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `detail`                                                                         | [models.FunctionCallOutputItemDetail](../models/functioncalloutputitemdetail.md) | :heavy_check_mark:                                                               | N/A                                                                              |
| `imageUrl`                                                                       | *string*                                                                         | :heavy_minus_sign:                                                               | N/A                                                                              |
| `type`                                                                           | *"input_image"*                                                                  | :heavy_check_mark:                                                               | N/A                                                                              |