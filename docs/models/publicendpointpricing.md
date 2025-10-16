# PublicEndpointPricing

## Example Usage

```typescript
import { PublicEndpointPricing } from "@openrouter/sdk/models";

let value: PublicEndpointPricing = {
  prompt: "<value>",
  completion: 1320.81,
  request: "<value>",
  image: 8976.94,
  imageOutput: 4433.18,
  audio: "<value>",
  inputAudioCache: "<value>",
  webSearch: "<value>",
  internalReasoning: "<value>",
  inputCacheRead: 3302.5,
  inputCacheWrite: 1230.7,
  discount: 4446.98,
};
```

## Fields

| Field                                    | Type                                     | Required                                 | Description                              |
| ---------------------------------------- | ---------------------------------------- | ---------------------------------------- | ---------------------------------------- |
| `prompt`                                 | *models.PublicEndpointPrompt*            | :heavy_check_mark:                       | N/A                                      |
| `completion`                             | *models.PublicEndpointCompletion*        | :heavy_check_mark:                       | N/A                                      |
| `request`                                | *models.PublicEndpointRequest*           | :heavy_minus_sign:                       | N/A                                      |
| `image`                                  | *models.PublicEndpointImage*             | :heavy_minus_sign:                       | N/A                                      |
| `imageOutput`                            | *models.PublicEndpointImageOutput*       | :heavy_minus_sign:                       | N/A                                      |
| `audio`                                  | *models.PublicEndpointAudio*             | :heavy_minus_sign:                       | N/A                                      |
| `inputAudioCache`                        | *models.PublicEndpointInputAudioCache*   | :heavy_minus_sign:                       | N/A                                      |
| `webSearch`                              | *models.PublicEndpointWebSearch*         | :heavy_minus_sign:                       | N/A                                      |
| `internalReasoning`                      | *models.PublicEndpointInternalReasoning* | :heavy_minus_sign:                       | N/A                                      |
| `inputCacheRead`                         | *models.PublicEndpointInputCacheRead*    | :heavy_minus_sign:                       | N/A                                      |
| `inputCacheWrite`                        | *models.PublicEndpointInputCacheWrite*   | :heavy_minus_sign:                       | N/A                                      |
| `discount`                               | *number*                                 | :heavy_minus_sign:                       | N/A                                      |