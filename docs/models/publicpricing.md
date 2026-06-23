# PublicPricing

Pricing information for the model

## Example Usage

```typescript
import { PublicPricing } from "@openrouter/sdk/models";

let value: PublicPricing = {
  completion: "0.00006",
  prompt: "0.00003",
};
```

## Fields

| Field                                                     | Type                                                      | Required                                                  | Description                                               |
| --------------------------------------------------------- | --------------------------------------------------------- | --------------------------------------------------------- | --------------------------------------------------------- |
| `audio`                                                   | *models.PublicPricingAudio*                               | :heavy_minus_sign:                                        | Price in USD per audio input token                        |
| `audioOutput`                                             | *models.PublicPricingAudioOutput*                         | :heavy_minus_sign:                                        | Price in USD per audio output token                       |
| `completion`                                              | *models.PublicPricingCompletion*                          | :heavy_check_mark:                                        | Price in USD per token for completion (output) generation |
| `discount`                                                | *number*                                                  | :heavy_minus_sign:                                        | N/A                                                       |
| `image`                                                   | *models.PublicPricingImage*                               | :heavy_minus_sign:                                        | Price in USD per input image                              |
| `imageOutput`                                             | *models.PublicPricingImageOutput*                         | :heavy_minus_sign:                                        | Price in USD per output image                             |
| `imageToken`                                              | *models.PublicPricingImageToken*                          | :heavy_minus_sign:                                        | Price in USD per image token                              |
| `inputAudioCache`                                         | *models.PublicPricingInputAudioCache*                     | :heavy_minus_sign:                                        | Price in USD per cached audio input token                 |
| `inputCacheRead`                                          | *models.PublicPricingInputCacheRead*                      | :heavy_minus_sign:                                        | Price in USD per cached input token (read)                |
| `inputCacheWrite`                                         | *models.PublicPricingInputCacheWrite*                     | :heavy_minus_sign:                                        | Price in USD per cached input token (write)               |
| `internalReasoning`                                       | *models.PublicPricingInternalReasoning*                   | :heavy_minus_sign:                                        | Price in USD per internal reasoning token                 |
| `prompt`                                                  | *models.PublicPricingPrompt*                              | :heavy_check_mark:                                        | Price in USD per token for prompt (input) processing      |
| `request`                                                 | *models.PublicPricingRequest*                             | :heavy_minus_sign:                                        | Price in USD per request                                  |
| `webSearch`                                               | *models.PublicPricingWebSearch*                           | :heavy_minus_sign:                                        | Price in USD per web search                               |