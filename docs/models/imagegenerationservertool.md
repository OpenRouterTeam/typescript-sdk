# ImageGenerationServerTool

Image generation tool configuration

## Example Usage

```typescript
import { ImageGenerationServerTool } from "@openrouter/sdk/models";

let value: ImageGenerationServerTool = {
  type: "image_generation",
};
```

## Fields

| Field                                                                                              | Type                                                                                               | Required                                                                                           | Description                                                                                        |
| -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `background`                                                                                       | [models.ImageGenerationServerToolBackground](../models/imagegenerationservertoolbackground.md)     | :heavy_minus_sign:                                                                                 | N/A                                                                                                |
| `inputFidelity`                                                                                    | [models.InputFidelity](../models/inputfidelity.md)                                                 | :heavy_minus_sign:                                                                                 | N/A                                                                                                |
| `inputImageMask`                                                                                   | [models.InputImageMask](../models/inputimagemask.md)                                               | :heavy_minus_sign:                                                                                 | N/A                                                                                                |
| `model`                                                                                            | [models.ModelEnum](../models/modelenum.md)                                                         | :heavy_minus_sign:                                                                                 | N/A                                                                                                |
| `moderation`                                                                                       | [models.ImageGenerationServerToolModeration](../models/imagegenerationservertoolmoderation.md)     | :heavy_minus_sign:                                                                                 | N/A                                                                                                |
| `outputCompression`                                                                                | *number*                                                                                           | :heavy_minus_sign:                                                                                 | N/A                                                                                                |
| `outputFormat`                                                                                     | [models.ImageGenerationServerToolOutputFormat](../models/imagegenerationservertooloutputformat.md) | :heavy_minus_sign:                                                                                 | N/A                                                                                                |
| `partialImages`                                                                                    | *number*                                                                                           | :heavy_minus_sign:                                                                                 | N/A                                                                                                |
| `quality`                                                                                          | [models.ImageGenerationServerToolQuality](../models/imagegenerationservertoolquality.md)           | :heavy_minus_sign:                                                                                 | N/A                                                                                                |
| `size`                                                                                             | [models.ImageGenerationServerToolSize](../models/imagegenerationservertoolsize.md)                 | :heavy_minus_sign:                                                                                 | N/A                                                                                                |
| `type`                                                                                             | *"image_generation"*                                                                               | :heavy_check_mark:                                                                                 | N/A                                                                                                |