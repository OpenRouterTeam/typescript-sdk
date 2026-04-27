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

| Field                                                                              | Type                                                                               | Required                                                                           | Description                                                                        |
| ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `background`                                                                       | [models.Background](../models/background.md)                                       | :heavy_minus_sign:                                                                 | N/A                                                                                |
| `inputFidelity`                                                                    | [models.InputFidelity](../models/inputfidelity.md)                                 | :heavy_minus_sign:                                                                 | N/A                                                                                |
| `inputImageMask`                                                                   | [models.InputImageMask](../models/inputimagemask.md)                               | :heavy_minus_sign:                                                                 | N/A                                                                                |
| `model`                                                                            | [models.ModelEnum](../models/modelenum.md)                                         | :heavy_minus_sign:                                                                 | N/A                                                                                |
| `moderation`                                                                       | [models.Moderation](../models/moderation.md)                                       | :heavy_minus_sign:                                                                 | N/A                                                                                |
| `outputCompression`                                                                | *number*                                                                           | :heavy_minus_sign:                                                                 | N/A                                                                                |
| `outputFormat`                                                                     | [models.OutputFormat](../models/outputformat.md)                                   | :heavy_minus_sign:                                                                 | N/A                                                                                |
| `partialImages`                                                                    | *number*                                                                           | :heavy_minus_sign:                                                                 | N/A                                                                                |
| `quality`                                                                          | [models.Quality](../models/quality.md)                                             | :heavy_minus_sign:                                                                 | N/A                                                                                |
| `size`                                                                             | [models.Size](../models/size.md)                                                   | :heavy_minus_sign:                                                                 | N/A                                                                                |
| `type`                                                                             | [models.ImageGenerationServerToolType](../models/imagegenerationservertooltype.md) | :heavy_check_mark:                                                                 | N/A                                                                                |