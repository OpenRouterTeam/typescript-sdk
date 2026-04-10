# OutputItemImageGenerationCall

## Example Usage

```typescript
import { OutputItemImageGenerationCall } from "@openrouter/sdk/models";

let value: OutputItemImageGenerationCall = {
  id: "imagegen-abc123",
  result:
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
  status: "completed",
  type: "image_generation_call",
};
```

## Fields

| Field                                                                                      | Type                                                                                       | Required                                                                                   | Description                                                                                | Example                                                                                    |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| `id`                                                                                       | *string*                                                                                   | :heavy_check_mark:                                                                         | N/A                                                                                        |                                                                                            |
| `result`                                                                                   | *string*                                                                                   | :heavy_minus_sign:                                                                         | N/A                                                                                        |                                                                                            |
| `status`                                                                                   | [models.ImageGenerationStatus](../models/imagegenerationstatus.md)                         | :heavy_check_mark:                                                                         | N/A                                                                                        | completed                                                                                  |
| `type`                                                                                     | [models.OutputItemImageGenerationCallType](../models/outputitemimagegenerationcalltype.md) | :heavy_check_mark:                                                                         | N/A                                                                                        |                                                                                            |