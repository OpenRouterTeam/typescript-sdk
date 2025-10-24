# OutputItemImageGenerationCall

## Example Usage

```typescript
import { OutputItemImageGenerationCall } from "@openrouter/sdk/models";

let value: OutputItemImageGenerationCall = {
  type: "image_generation_call",
  id: "imagegen-abc123",
  result:
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
  status: "completed",
};
```

## Fields

| Field                                                                                      | Type                                                                                       | Required                                                                                   | Description                                                                                | Example                                                                                    |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| `type`                                                                                     | [models.OutputItemImageGenerationCallType](../models/outputitemimagegenerationcalltype.md) | :heavy_check_mark:                                                                         | N/A                                                                                        |                                                                                            |
| `id`                                                                                       | *string*                                                                                   | :heavy_check_mark:                                                                         | N/A                                                                                        |                                                                                            |
| `result`                                                                                   | *string*                                                                                   | :heavy_check_mark:                                                                         | N/A                                                                                        |                                                                                            |
| `status`                                                                                   | [models.ImageGenerationStatus](../models/imagegenerationstatus.md)                         | :heavy_check_mark:                                                                         | N/A                                                                                        | completed                                                                                  |