# Pricing

## Example Usage

```typescript
import { Pricing } from "@openrouter/sdk/models";

let value: Pricing = {
  completion: "<value>",
  prompt: "<value>",
};
```

## Fields

| Field                                                     | Type                                                      | Required                                                  | Description                                               |
| --------------------------------------------------------- | --------------------------------------------------------- | --------------------------------------------------------- | --------------------------------------------------------- |
| `audio`                                                   | *models.PublicEndpointAudio*                              | :heavy_minus_sign:                                        | Price in USD per audio input token                        |
| `audioOutput`                                             | *models.PublicEndpointAudioOutput*                        | :heavy_minus_sign:                                        | Price in USD per audio output token                       |
| `completion`                                              | *models.PublicEndpointCompletion*                         | :heavy_check_mark:                                        | Price in USD per token for completion (output) generation |
| `discount`                                                | *number*                                                  | :heavy_minus_sign:                                        | N/A                                                       |
| `image`                                                   | *models.PublicEndpointImage*                              | :heavy_minus_sign:                                        | Price in USD per input image                              |
| `imageOutput`                                             | *models.PublicEndpointImageOutput*                        | :heavy_minus_sign:                                        | Price in USD per output image                             |
| `imageToken`                                              | *models.PublicEndpointImageToken*                         | :heavy_minus_sign:                                        | Price in USD per image token                              |
| `inputAudioCache`                                         | *models.PublicEndpointInputAudioCache*                    | :heavy_minus_sign:                                        | Price in USD per cached audio input token                 |
| `inputCacheRead`                                          | *models.PublicEndpointInputCacheRead*                     | :heavy_minus_sign:                                        | Price in USD per cached input token (read)                |
| `inputCacheWrite`                                         | *models.PublicEndpointInputCacheWrite*                    | :heavy_minus_sign:                                        | Price in USD per cached input token (write)               |
| `internalReasoning`                                       | *models.PublicEndpointInternalReasoning*                  | :heavy_minus_sign:                                        | Price in USD per internal reasoning token                 |
| `prompt`                                                  | *models.PublicEndpointPrompt*                             | :heavy_check_mark:                                        | Price in USD per token for prompt (input) processing      |
| `request`                                                 | *models.PublicEndpointRequest*                            | :heavy_minus_sign:                                        | Price in USD per request                                  |
| `webSearch`                                               | *models.PublicEndpointWebSearch*                          | :heavy_minus_sign:                                        | Price in USD per web search                               |