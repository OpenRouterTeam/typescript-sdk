# ModelsListPricing

Pricing information for the model

## Example Usage

```typescript
import { ModelsListPricing } from "@openrouter/sdk/models";

let value: ModelsListPricing = {
  prompt: 7785.78,
  completion: "<value>",
  request: "<value>",
  image: 5022.97,
  imageOutput: 2728.1,
  audio: "<value>",
  inputAudioCache: 9097.27,
  webSearch: "<value>",
  internalReasoning: "<value>",
  inputCacheRead: 2067.9,
  inputCacheWrite: 733.41,
  discount: 5268.8,
};
```

## Fields

| Field                                | Type                                 | Required                             | Description                          |
| ------------------------------------ | ------------------------------------ | ------------------------------------ | ------------------------------------ |
| `prompt`                             | *models.ModelsListPrompt*            | :heavy_check_mark:                   | N/A                                  |
| `completion`                         | *models.ModelsListCompletion*        | :heavy_check_mark:                   | N/A                                  |
| `request`                            | *models.ModelsListRequest*           | :heavy_minus_sign:                   | N/A                                  |
| `image`                              | *models.ModelsListImage*             | :heavy_minus_sign:                   | N/A                                  |
| `imageOutput`                        | *models.ModelsListImageOutput*       | :heavy_minus_sign:                   | N/A                                  |
| `audio`                              | *models.ModelsListAudio*             | :heavy_minus_sign:                   | N/A                                  |
| `inputAudioCache`                    | *models.ModelsListInputAudioCache*   | :heavy_minus_sign:                   | N/A                                  |
| `webSearch`                          | *models.ModelsListWebSearch*         | :heavy_minus_sign:                   | N/A                                  |
| `internalReasoning`                  | *models.ModelsListInternalReasoning* | :heavy_minus_sign:                   | N/A                                  |
| `inputCacheRead`                     | *models.ModelsListInputCacheRead*    | :heavy_minus_sign:                   | N/A                                  |
| `inputCacheWrite`                    | *models.ModelsListInputCacheWrite*   | :heavy_minus_sign:                   | N/A                                  |
| `discount`                           | *number*                             | :heavy_minus_sign:                   | N/A                                  |