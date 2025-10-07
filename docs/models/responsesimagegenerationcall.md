# ResponsesImageGenerationCall

Image generation call in Responses API

## Example Usage

```typescript
import { ResponsesImageGenerationCall } from "@openrouter/sdk/models";

let value: ResponsesImageGenerationCall = {
  type: "image_generation_call",
  id: "<id>",
  result: "<value>",
  status: "completed",
};
```

## Fields

| Field                                                                                      | Type                                                                                       | Required                                                                                   | Description                                                                                | Example                                                                                    |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| `type`                                                                                     | [models.ResponsesImageGenerationCallType](../models/responsesimagegenerationcalltype.md)   | :heavy_check_mark:                                                                         | N/A                                                                                        |                                                                                            |
| `id`                                                                                       | *string*                                                                                   | :heavy_check_mark:                                                                         | N/A                                                                                        |                                                                                            |
| `result`                                                                                   | *string*                                                                                   | :heavy_check_mark:                                                                         | N/A                                                                                        |                                                                                            |
| `status`                                                                                   | [models.ResponseImageGenerationCallStatus](../models/responseimagegenerationcallstatus.md) | :heavy_check_mark:                                                                         | N/A                                                                                        | completed                                                                                  |