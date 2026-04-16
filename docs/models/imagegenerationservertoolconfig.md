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
| `model`                                                                                            | *string*                                                                                           | :heavy_minus_sign:                                                                                 | Which image generation model to use (e.g. "openai/gpt-5-image"). Defaults to "openai/gpt-5-image". | openai/gpt-5-image                                                                                 |
| `additionalProperties`                                                                             | Record<string, *models.ImageGenerationServerToolConfigUnion*>                                      | :heavy_minus_sign:                                                                                 | N/A                                                                                                | {<br/>"aspect_ratio": "16:9",<br/>"model": "openai/gpt-5-image",<br/>"quality": "high"<br/>}       |