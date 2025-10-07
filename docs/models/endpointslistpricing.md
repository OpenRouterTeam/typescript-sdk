# EndpointsListPricing

## Example Usage

```typescript
import { EndpointsListPricing } from "@openrouter/sdk/models";

let value: EndpointsListPricing = {
  prompt: "<value>",
  completion: "<value>",
  request: 3383.66,
  image: "https://picsum.photos/seed/9gKb5O2/1167/628",
  imageOutput: 3873.54,
  audio: "<value>",
  inputAudioCache: 8827.43,
  webSearch: "<value>",
  internalReasoning: "<value>",
  inputCacheRead: 1568.18,
  inputCacheWrite: 2858.23,
  discount: 3831.12,
};
```

## Fields

| Field                                   | Type                                    | Required                                | Description                             |
| --------------------------------------- | --------------------------------------- | --------------------------------------- | --------------------------------------- |
| `prompt`                                | *models.EndpointsListPrompt*            | :heavy_check_mark:                      | N/A                                     |
| `completion`                            | *models.EndpointsListCompletion*        | :heavy_check_mark:                      | N/A                                     |
| `request`                               | *models.EndpointsListRequest*           | :heavy_minus_sign:                      | N/A                                     |
| `image`                                 | *models.EndpointsListImage*             | :heavy_minus_sign:                      | N/A                                     |
| `imageOutput`                           | *models.EndpointsListImageOutput*       | :heavy_minus_sign:                      | N/A                                     |
| `audio`                                 | *models.EndpointsListAudio*             | :heavy_minus_sign:                      | N/A                                     |
| `inputAudioCache`                       | *models.EndpointsListInputAudioCache*   | :heavy_minus_sign:                      | N/A                                     |
| `webSearch`                             | *models.EndpointsListWebSearch*         | :heavy_minus_sign:                      | N/A                                     |
| `internalReasoning`                     | *models.EndpointsListInternalReasoning* | :heavy_minus_sign:                      | N/A                                     |
| `inputCacheRead`                        | *models.EndpointsListInputCacheRead*    | :heavy_minus_sign:                      | N/A                                     |
| `inputCacheWrite`                       | *models.EndpointsListInputCacheWrite*   | :heavy_minus_sign:                      | N/A                                     |
| `discount`                              | *number*                                | :heavy_minus_sign:                      | N/A                                     |