# ImageGenerationServerToolOpenRouter

OpenRouter built-in server tool: generates images from text prompts using an image generation model

## Example Usage

```typescript
import { ImageGenerationServerToolOpenRouter } from "@openrouter/sdk/models";

let value: ImageGenerationServerToolOpenRouter = {
  type: "openrouter:image_generation",
};
```

## Fields

| Field                                                                                                  | Type                                                                                                   | Required                                                                                               | Description                                                                                            | Example                                                                                                |
| ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| `parameters`                                                                                           | [models.ImageGenerationServerToolConfig](../models/imagegenerationservertoolconfig.md)                 | :heavy_minus_sign:                                                                                     | Configuration for the openrouter:image_generation server tool                                          | {<br/>"model": "openai/gpt-image-1",<br/>"quality": "high",<br/>"size": "1024x1024"<br/>}              |
| `type`                                                                                                 | [models.ImageGenerationServerToolOpenRouterType](../models/imagegenerationservertoolopenroutertype.md) | :heavy_check_mark:                                                                                     | N/A                                                                                                    |                                                                                                        |