# OutputImageGenerationCallItem

## Example Usage

```typescript
import { OutputImageGenerationCallItem } from "@openrouter/sdk/models";

let value: OutputImageGenerationCallItem = {
  id: "img-abc123",
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
| `type`                                                                                     | [models.OutputImageGenerationCallItemType](../models/outputimagegenerationcallitemtype.md) | :heavy_check_mark:                                                                         | N/A                                                                                        |                                                                                            |