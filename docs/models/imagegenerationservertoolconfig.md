# ImageGenerationServerToolConfig

Configuration for the openrouter:image_generation server tool. Accepts all image_config params (aspect_ratio, quality, size, background, output_format, output_compression, moderation, etc.) plus a model field.

## Example Usage

```typescript
import { ImageGenerationServerToolConfig } from "@openrouter/sdk/models";

let value: ImageGenerationServerToolConfig = {};
```

## Fields

| Field                                                                                              | Type                                                                                               | Required                                                                                           | Description                                                                                        | Example                                                                                            |
| -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `model`                                                                                            | *string*                                                                                           | :heavy_minus_sign:                                                                                 | Which image generation model to use (e.g. "openai/gpt-image-1"). Defaults to "openai/gpt-image-1". | openai/gpt-image-1                                                                                 |
| `additionalProperties`                                                                             | Record<string, *models.ImageGenerationServerToolConfigUnion*>                                      | :heavy_minus_sign:                                                                                 | N/A                                                                                                | {<br/>"aspect_ratio": "16:9",<br/>"model": "openai/gpt-image-1",<br/>"quality": "high"<br/>}       |