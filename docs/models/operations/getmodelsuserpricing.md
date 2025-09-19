# GetModelsUserPricing

Pricing information for the model

## Example Usage

```typescript
import { GetModelsUserPricing } from "open-router/models/operations";

let value: GetModelsUserPricing = {
  prompt: "<value>",
  completion: "<value>",
};
```

## Fields

| Field                                       | Type                                        | Required                                    | Description                                 |
| ------------------------------------------- | ------------------------------------------- | ------------------------------------------- | ------------------------------------------- |
| `prompt`                                    | *operations.GetModelsUserPrompt*            | :heavy_check_mark:                          | N/A                                         |
| `completion`                                | *operations.GetModelsUserCompletion*        | :heavy_check_mark:                          | N/A                                         |
| `request`                                   | *operations.ModelsGetModelsUserRequest*     | :heavy_minus_sign:                          | N/A                                         |
| `image`                                     | *operations.GetModelsUserImage*             | :heavy_minus_sign:                          | N/A                                         |
| `imageOutput`                               | *operations.GetModelsUserImageOutput*       | :heavy_minus_sign:                          | N/A                                         |
| `audio`                                     | *operations.GetModelsUserAudio*             | :heavy_minus_sign:                          | N/A                                         |
| `inputAudioCache`                           | *operations.GetModelsUserInputAudioCache*   | :heavy_minus_sign:                          | N/A                                         |
| `webSearch`                                 | *operations.GetModelsUserWebSearch*         | :heavy_minus_sign:                          | N/A                                         |
| `internalReasoning`                         | *operations.GetModelsUserInternalReasoning* | :heavy_minus_sign:                          | N/A                                         |
| `inputCacheRead`                            | *operations.GetModelsUserInputCacheRead*    | :heavy_minus_sign:                          | N/A                                         |
| `inputCacheWrite`                           | *operations.GetModelsUserInputCacheWrite*   | :heavy_minus_sign:                          | N/A                                         |
| `discount`                                  | *number*                                    | :heavy_minus_sign:                          | N/A                                         |