# ModelPricing

Pricing information for the model

## Example Usage

```typescript
import { ModelPricing } from "@openrouter/sdk/models";

let value: ModelPricing = {
  prompt: "<value>",
  completion: "<value>",
  request: 2562.69,
  image: "https://picsum.photos/seed/MdJjw/3588/3221",
  imageOutput: "<value>",
  audio: "<value>",
  inputAudioCache: 8091.88,
  webSearch: "<value>",
  internalReasoning: "<value>",
  inputCacheRead: 7983.5,
  inputCacheWrite: "<value>",
  discount: 8789.31,
};
```

## Fields

| Field                           | Type                            | Required                        | Description                     |
| ------------------------------- | ------------------------------- | ------------------------------- | ------------------------------- |
| `prompt`                        | *models.ModelPrompt*            | :heavy_check_mark:              | N/A                             |
| `completion`                    | *models.ModelCompletion*        | :heavy_check_mark:              | N/A                             |
| `request`                       | *models.ModelRequest*           | :heavy_minus_sign:              | N/A                             |
| `image`                         | *models.ModelImage*             | :heavy_minus_sign:              | N/A                             |
| `imageOutput`                   | *models.ModelImageOutput*       | :heavy_minus_sign:              | N/A                             |
| `audio`                         | *models.ModelAudio*             | :heavy_minus_sign:              | N/A                             |
| `inputAudioCache`               | *models.ModelInputAudioCache*   | :heavy_minus_sign:              | N/A                             |
| `webSearch`                     | *models.ModelWebSearch*         | :heavy_minus_sign:              | N/A                             |
| `internalReasoning`             | *models.ModelInternalReasoning* | :heavy_minus_sign:              | N/A                             |
| `inputCacheRead`                | *models.ModelInputCacheRead*    | :heavy_minus_sign:              | N/A                             |
| `inputCacheWrite`               | *models.ModelInputCacheWrite*   | :heavy_minus_sign:              | N/A                             |
| `discount`                      | *number*                        | :heavy_minus_sign:              | N/A                             |