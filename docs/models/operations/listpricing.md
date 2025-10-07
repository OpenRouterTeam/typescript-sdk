# ListPricing

## Example Usage

```typescript
import { ListPricing } from "@openrouter/sdk/models/operations";

let value: ListPricing = {
  prompt: "<value>",
  completion: 3825.88,
  request: "<value>",
  image: "https://picsum.photos/seed/u2J8nnlot/3260/3628",
  imageOutput: 8933.69,
  audio: "<value>",
  inputAudioCache: "<value>",
  webSearch: "<value>",
  internalReasoning: "<value>",
  inputCacheRead: 6038.34,
  inputCacheWrite: "<value>",
  discount: 8480.47,
};
```

## Fields

| Field                              | Type                               | Required                           | Description                        |
| ---------------------------------- | ---------------------------------- | ---------------------------------- | ---------------------------------- |
| `prompt`                           | *operations.ListPrompt*            | :heavy_check_mark:                 | N/A                                |
| `completion`                       | *operations.ListCompletion*        | :heavy_check_mark:                 | N/A                                |
| `request`                          | *operations.EndpointsListRequest*  | :heavy_minus_sign:                 | N/A                                |
| `image`                            | *operations.ListImage*             | :heavy_minus_sign:                 | N/A                                |
| `imageOutput`                      | *operations.ListImageOutput*       | :heavy_minus_sign:                 | N/A                                |
| `audio`                            | *operations.ListAudio*             | :heavy_minus_sign:                 | N/A                                |
| `inputAudioCache`                  | *operations.ListInputAudioCache*   | :heavy_minus_sign:                 | N/A                                |
| `webSearch`                        | *operations.ListWebSearch*         | :heavy_minus_sign:                 | N/A                                |
| `internalReasoning`                | *operations.ListInternalReasoning* | :heavy_minus_sign:                 | N/A                                |
| `inputCacheRead`                   | *operations.ListInputCacheRead*    | :heavy_minus_sign:                 | N/A                                |
| `inputCacheWrite`                  | *operations.ListInputCacheWrite*   | :heavy_minus_sign:                 | N/A                                |
| `discount`                         | *number*                           | :heavy_minus_sign:                 | N/A                                |