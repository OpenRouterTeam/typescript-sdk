# PreviewZDRData

## Example Usage

```typescript
import { PreviewZDRData } from "@openrouter/sdk/models/operations";

let value: PreviewZDRData = {
  name: "<value>",
  modelName: "<value>",
  contextLength: 6626.82,
  pricing: {
    prompt: "<value>",
    completion: "<value>",
    request: "<value>",
    image: "https://loremflickr.com/1416/3470?lock=1718454407698416",
    imageOutput: "<value>",
    audio: 5977.04,
    inputAudioCache: 4031.62,
    webSearch: 5448.77,
    internalReasoning: 1120.66,
    inputCacheRead: "<value>",
    inputCacheWrite: 6704.69,
    discount: 491.38,
  },
  providerName: "Venice",
  tag: "<value>",
  quantization: "int4",
  maxCompletionTokens: 1834.27,
  maxPromptTokens: 8654.17,
  supportedParameters: [],
  status: -2,
  uptimeLast30m: 3305.27,
  supportsImplicitCaching: false,
};
```

## Fields

| Field                                                                                                | Type                                                                                                 | Required                                                                                             | Description                                                                                          |
| ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `name`                                                                                               | *string*                                                                                             | :heavy_check_mark:                                                                                   | N/A                                                                                                  |
| `modelName`                                                                                          | *string*                                                                                             | :heavy_check_mark:                                                                                   | N/A                                                                                                  |
| `contextLength`                                                                                      | *number*                                                                                             | :heavy_check_mark:                                                                                   | N/A                                                                                                  |
| `pricing`                                                                                            | [operations.PreviewZDRPricing](../../models/operations/previewzdrpricing.md)                         | :heavy_check_mark:                                                                                   | N/A                                                                                                  |
| `providerName`                                                                                       | [operations.PreviewZDRProviderName](../../models/operations/previewzdrprovidername.md)               | :heavy_check_mark:                                                                                   | N/A                                                                                                  |
| `tag`                                                                                                | *string*                                                                                             | :heavy_check_mark:                                                                                   | N/A                                                                                                  |
| `quantization`                                                                                       | [operations.PreviewZDRQuantization](../../models/operations/previewzdrquantization.md)               | :heavy_check_mark:                                                                                   | N/A                                                                                                  |
| `maxCompletionTokens`                                                                                | *number*                                                                                             | :heavy_check_mark:                                                                                   | N/A                                                                                                  |
| `maxPromptTokens`                                                                                    | *number*                                                                                             | :heavy_check_mark:                                                                                   | N/A                                                                                                  |
| `supportedParameters`                                                                                | [operations.PreviewZDRSupportedParameter](../../models/operations/previewzdrsupportedparameter.md)[] | :heavy_check_mark:                                                                                   | N/A                                                                                                  |
| `status`                                                                                             | [operations.PreviewZDRStatus](../../models/operations/previewzdrstatus.md)                           | :heavy_minus_sign:                                                                                   | N/A                                                                                                  |
| `uptimeLast30m`                                                                                      | *number*                                                                                             | :heavy_check_mark:                                                                                   | N/A                                                                                                  |
| `supportsImplicitCaching`                                                                            | *boolean*                                                                                            | :heavy_check_mark:                                                                                   | N/A                                                                                                  |