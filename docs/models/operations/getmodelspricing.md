# GetModelsPricing

Pricing information for the model

## Example Usage

```typescript
import { GetModelsPricing } from "open-router/models/operations";

let value: GetModelsPricing = {
  prompt: 8393.16,
  completion: "<value>",
};
```

## Fields

| Field                                   | Type                                    | Required                                | Description                             |
| --------------------------------------- | --------------------------------------- | --------------------------------------- | --------------------------------------- |
| `prompt`                                | *operations.GetModelsPrompt*            | :heavy_check_mark:                      | N/A                                     |
| `completion`                            | *operations.GetModelsCompletion*        | :heavy_check_mark:                      | N/A                                     |
| `request`                               | *operations.ModelsGetModelsRequest*     | :heavy_minus_sign:                      | N/A                                     |
| `image`                                 | *operations.GetModelsImage*             | :heavy_minus_sign:                      | N/A                                     |
| `imageOutput`                           | *operations.GetModelsImageOutput*       | :heavy_minus_sign:                      | N/A                                     |
| `audio`                                 | *operations.GetModelsAudio*             | :heavy_minus_sign:                      | N/A                                     |
| `inputAudioCache`                       | *operations.GetModelsInputAudioCache*   | :heavy_minus_sign:                      | N/A                                     |
| `webSearch`                             | *operations.GetModelsWebSearch*         | :heavy_minus_sign:                      | N/A                                     |
| `internalReasoning`                     | *operations.GetModelsInternalReasoning* | :heavy_minus_sign:                      | N/A                                     |
| `inputCacheRead`                        | *operations.GetModelsInputCacheRead*    | :heavy_minus_sign:                      | N/A                                     |
| `inputCacheWrite`                       | *operations.GetModelsInputCacheWrite*   | :heavy_minus_sign:                      | N/A                                     |
| `discount`                              | *number*                                | :heavy_minus_sign:                      | N/A                                     |