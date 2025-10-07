# Pricing

## Example Usage

```typescript
import { Pricing } from "@openrouter/sdk/models/operations";

let value: Pricing = {
  prompt: "<value>",
  completion: "<value>",
  request: "<value>",
  image: 8175.05,
  imageOutput: "<value>",
  audio: 7647.94,
  inputAudioCache: "<value>",
  webSearch: "<value>",
  internalReasoning: 1863.9,
  inputCacheRead: 764.46,
  inputCacheWrite: 165.68,
  discount: 8551.83,
};
```

## Fields

| Field                                   | Type                                    | Required                                | Description                             |
| --------------------------------------- | --------------------------------------- | --------------------------------------- | --------------------------------------- |
| `prompt`                                | *operations.PreviewZDRPrompt*           | :heavy_check_mark:                      | N/A                                     |
| `completion`                            | *operations.PreviewZDRCompletion*       | :heavy_check_mark:                      | N/A                                     |
| `request`                               | *operations.EndpointsPreviewZDRRequest* | :heavy_minus_sign:                      | N/A                                     |
| `image`                                 | *operations.PreviewZDRImage*            | :heavy_minus_sign:                      | N/A                                     |
| `imageOutput`                           | *operations.ImageOutput*                | :heavy_minus_sign:                      | N/A                                     |
| `audio`                                 | *operations.PreviewZDRAudio*            | :heavy_minus_sign:                      | N/A                                     |
| `inputAudioCache`                       | *operations.InputAudioCache*            | :heavy_minus_sign:                      | N/A                                     |
| `webSearch`                             | *operations.WebSearch*                  | :heavy_minus_sign:                      | N/A                                     |
| `internalReasoning`                     | *operations.InternalReasoning*          | :heavy_minus_sign:                      | N/A                                     |
| `inputCacheRead`                        | *operations.InputCacheRead*             | :heavy_minus_sign:                      | N/A                                     |
| `inputCacheWrite`                       | *operations.InputCacheWrite*            | :heavy_minus_sign:                      | N/A                                     |
| `discount`                              | *number*                                | :heavy_minus_sign:                      | N/A                                     |