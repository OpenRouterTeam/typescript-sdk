# OutputImageGenerationCallItem

## Example Usage

```typescript
import { OutputImageGenerationCallItem } from "@openrouter/sdk/models";

let value: OutputImageGenerationCallItem = {
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
| `type`                                                                                     | [models.OutputImageGenerationCallItemType](../models/outputimagegenerationcallitemtype.md) | :heavy_check_mark:                                                                         | N/A                                                                                        |                                                                                            |
| `id`                                                                                       | *string*                                                                                   | :heavy_check_mark:                                                                         | N/A                                                                                        |                                                                                            |
| `result`                                                                                   | *string*                                                                                   | :heavy_minus_sign:                                                                         | N/A                                                                                        |                                                                                            |
| `status`                                                                                   | [models.ImageGenerationStatus](../models/imagegenerationstatus.md)                         | :heavy_check_mark:                                                                         | N/A                                                                                        | completed                                                                                  |