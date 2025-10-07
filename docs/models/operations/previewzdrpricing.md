# PreviewZDRPricing

## Example Usage

```typescript
import { PreviewZDRPricing } from "@openrouter/sdk/models/operations";

let value: PreviewZDRPricing = {
  prompt: "<value>",
  completion: 6741.82,
  request: "<value>",
  image: "https://picsum.photos/seed/nl09Zp2X/1934/2746",
  imageOutput: 103.53,
  audio: "<value>",
  inputAudioCache: "<value>",
  webSearch: "<value>",
  internalReasoning: "<value>",
  inputCacheRead: "<value>",
  inputCacheWrite: "<value>",
  discount: 7539.41,
};
```

## Fields

| Field                                    | Type                                     | Required                                 | Description                              |
| ---------------------------------------- | ---------------------------------------- | ---------------------------------------- | ---------------------------------------- |
| `prompt`                                 | *operations.PreviewZDRPrompt*            | :heavy_check_mark:                       | N/A                                      |
| `completion`                             | *operations.PreviewZDRCompletion*        | :heavy_check_mark:                       | N/A                                      |
| `request`                                | *operations.EndpointsPreviewZDRRequest*  | :heavy_minus_sign:                       | N/A                                      |
| `image`                                  | *operations.PreviewZDRImage*             | :heavy_minus_sign:                       | N/A                                      |
| `imageOutput`                            | *operations.PreviewZDRImageOutput*       | :heavy_minus_sign:                       | N/A                                      |
| `audio`                                  | *operations.PreviewZDRAudio*             | :heavy_minus_sign:                       | N/A                                      |
| `inputAudioCache`                        | *operations.PreviewZDRInputAudioCache*   | :heavy_minus_sign:                       | N/A                                      |
| `webSearch`                              | *operations.PreviewZDRWebSearch*         | :heavy_minus_sign:                       | N/A                                      |
| `internalReasoning`                      | *operations.PreviewZDRInternalReasoning* | :heavy_minus_sign:                       | N/A                                      |
| `inputCacheRead`                         | *operations.PreviewZDRInputCacheRead*    | :heavy_minus_sign:                       | N/A                                      |
| `inputCacheWrite`                        | *operations.PreviewZDRInputCacheWrite*   | :heavy_minus_sign:                       | N/A                                      |
| `discount`                               | *number*                                 | :heavy_minus_sign:                       | N/A                                      |