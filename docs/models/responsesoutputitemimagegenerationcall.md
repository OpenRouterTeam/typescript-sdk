# ResponsesOutputItemImageGenerationCall

## Example Usage

```typescript
import { ResponsesOutputItemImageGenerationCall } from "@openrouter/sdk/models";

let value: ResponsesOutputItemImageGenerationCall = {
  type: "image_generation_call",
  id: "<id>",
  result: null,
  status: "generating",
};
```

## Fields

| Field                                                                                                        | Type                                                                                                         | Required                                                                                                     | Description                                                                                                  |
| ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------ |
| `type`                                                                                                       | [models.ResponsesOutputItemTypeImageGenerationCall](../models/responsesoutputitemtypeimagegenerationcall.md) | :heavy_check_mark:                                                                                           | N/A                                                                                                          |
| `id`                                                                                                         | *string*                                                                                                     | :heavy_check_mark:                                                                                           | N/A                                                                                                          |
| `result`                                                                                                     | *string*                                                                                                     | :heavy_check_mark:                                                                                           | N/A                                                                                                          |
| `status`                                                                                                     | [models.ImageGenerationStatus](../models/imagegenerationstatus.md)                                           | :heavy_check_mark:                                                                                           | N/A                                                                                                          |