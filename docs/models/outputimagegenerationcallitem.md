# OutputImageGenerationCallItem

## Example Usage

```typescript
import { OutputImageGenerationCallItem } from "@openrouter/sdk/models";

let value: OutputImageGenerationCallItem = {
  type: "image_generation_call",
  id: "img-abc123",
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