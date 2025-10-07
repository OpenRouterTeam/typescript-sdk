# ListUserModelsPricing

Pricing information for the model

## Example Usage

```typescript
import { ListUserModelsPricing } from "@openrouter/sdk/models/operations";

let value: ListUserModelsPricing = {
  prompt: "<value>",
  completion: "<value>",
  request: "<value>",
  image: 9110.5,
  imageOutput: "<value>",
  audio: "<value>",
  inputAudioCache: 2308.62,
  webSearch: 8277.78,
  internalReasoning: "<value>",
  inputCacheRead: 8478.25,
  inputCacheWrite: "<value>",
  discount: 5180.67,
};
```

## Fields

| Field                                        | Type                                         | Required                                     | Description                                  |
| -------------------------------------------- | -------------------------------------------- | -------------------------------------------- | -------------------------------------------- |
| `prompt`                                     | *operations.ListUserModelsPrompt*            | :heavy_check_mark:                           | N/A                                          |
| `completion`                                 | *operations.ListUserModelsCompletion*        | :heavy_check_mark:                           | N/A                                          |
| `request`                                    | *operations.ModelsListUserModelsRequest*     | :heavy_minus_sign:                           | N/A                                          |
| `image`                                      | *operations.ListUserModelsImage*             | :heavy_minus_sign:                           | N/A                                          |
| `imageOutput`                                | *operations.ListUserModelsImageOutput*       | :heavy_minus_sign:                           | N/A                                          |
| `audio`                                      | *operations.ListUserModelsAudio*             | :heavy_minus_sign:                           | N/A                                          |
| `inputAudioCache`                            | *operations.ListUserModelsInputAudioCache*   | :heavy_minus_sign:                           | N/A                                          |
| `webSearch`                                  | *operations.ListUserModelsWebSearch*         | :heavy_minus_sign:                           | N/A                                          |
| `internalReasoning`                          | *operations.ListUserModelsInternalReasoning* | :heavy_minus_sign:                           | N/A                                          |
| `inputCacheRead`                             | *operations.ListUserModelsInputCacheRead*    | :heavy_minus_sign:                           | N/A                                          |
| `inputCacheWrite`                            | *operations.ListUserModelsInputCacheWrite*   | :heavy_minus_sign:                           | N/A                                          |
| `discount`                                   | *number*                                     | :heavy_minus_sign:                           | N/A                                          |