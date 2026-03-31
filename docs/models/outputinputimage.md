# OutputInputImage

Image input content item

## Example Usage

```typescript
import { OutputInputImage } from "@openrouter/sdk/models";

let value: OutputInputImage = {
  type: "input_image",
  detail: "auto",
};
```

## Fields

| Field                                                                            | Type                                                                             | Required                                                                         | Description                                                                      |
| -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `type`                                                                           | *"input_image"*                                                                  | :heavy_check_mark:                                                               | N/A                                                                              |
| `detail`                                                                         | [models.FunctionCallOutputItemDetail](../models/functioncalloutputitemdetail.md) | :heavy_check_mark:                                                               | N/A                                                                              |
| `imageUrl`                                                                       | *string*                                                                         | :heavy_minus_sign:                                                               | N/A                                                                              |