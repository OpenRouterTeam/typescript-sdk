# ListModelsPricing

Pricing information for the model

## Example Usage

```typescript
import { ListModelsPricing } from "@openrouter/sdk/models/operations";

let value: ListModelsPricing = {
  prompt: 1384.38,
  completion: 6121.5,
  request: "<value>",
  image: "https://loremflickr.com/2837/3295?lock=6538371474606903",
  imageOutput: "<value>",
  audio: "<value>",
  inputAudioCache: "<value>",
  webSearch: "<value>",
  internalReasoning: "<value>",
  inputCacheRead: 6894.53,
  inputCacheWrite: 5372.71,
  discount: 2700.22,
};
```

## Fields

| Field                                    | Type                                     | Required                                 | Description                              |
| ---------------------------------------- | ---------------------------------------- | ---------------------------------------- | ---------------------------------------- |
| `prompt`                                 | *operations.ListModelsPrompt*            | :heavy_check_mark:                       | N/A                                      |
| `completion`                             | *operations.ListModelsCompletion*        | :heavy_check_mark:                       | N/A                                      |
| `request`                                | *operations.ModelsListModelsRequest*     | :heavy_minus_sign:                       | N/A                                      |
| `image`                                  | *operations.ListModelsImage*             | :heavy_minus_sign:                       | N/A                                      |
| `imageOutput`                            | *operations.ListModelsImageOutput*       | :heavy_minus_sign:                       | N/A                                      |
| `audio`                                  | *operations.ListModelsAudio*             | :heavy_minus_sign:                       | N/A                                      |
| `inputAudioCache`                        | *operations.ListModelsInputAudioCache*   | :heavy_minus_sign:                       | N/A                                      |
| `webSearch`                              | *operations.ListModelsWebSearch*         | :heavy_minus_sign:                       | N/A                                      |
| `internalReasoning`                      | *operations.ListModelsInternalReasoning* | :heavy_minus_sign:                       | N/A                                      |
| `inputCacheRead`                         | *operations.ListModelsInputCacheRead*    | :heavy_minus_sign:                       | N/A                                      |
| `inputCacheWrite`                        | *operations.ListModelsInputCacheWrite*   | :heavy_minus_sign:                       | N/A                                      |
| `discount`                               | *number*                                 | :heavy_minus_sign:                       | N/A                                      |