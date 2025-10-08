# EndpointsList

## Example Usage

```typescript
import { EndpointsList } from "@openrouter/sdk/models";

let value: EndpointsList = {
  name: "<value>",
  modelName: "<value>",
  contextLength: 5338.49,
  pricing: {
    prompt: "<value>",
    completion: 8196.41,
    request: 3274.9,
    image: "https://loremflickr.com/1036/3134?lock=6296743801335005",
    imageOutput: "<value>",
    audio: 2829.92,
    inputAudioCache: "<value>",
    webSearch: "<value>",
    internalReasoning: "<value>",
    inputCacheRead: 9658.27,
    inputCacheWrite: 8015.77,
    discount: 580.71,
  },
  providerName: "Stealth",
  tag: "<value>",
  quantization: "fp6",
  maxCompletionTokens: 9257.7,
  maxPromptTokens: 718.98,
  supportedParameters: [],
  status: -3,
  uptimeLast30m: 180.44,
  supportsImplicitCaching: false,
};
```

## Fields

| Field                                                                                    | Type                                                                                     | Required                                                                                 | Description                                                                              |
| ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `name`                                                                                   | *string*                                                                                 | :heavy_check_mark:                                                                       | N/A                                                                                      |
| `modelName`                                                                              | *string*                                                                                 | :heavy_check_mark:                                                                       | N/A                                                                                      |
| `contextLength`                                                                          | *number*                                                                                 | :heavy_check_mark:                                                                       | N/A                                                                                      |
| `pricing`                                                                                | [models.EndpointsListPricing](../models/endpointslistpricing.md)                         | :heavy_check_mark:                                                                       | N/A                                                                                      |
| `providerName`                                                                           | [models.ProviderName](../models/providername.md)                                         | :heavy_check_mark:                                                                       | N/A                                                                                      |
| `tag`                                                                                    | *string*                                                                                 | :heavy_check_mark:                                                                       | N/A                                                                                      |
| `quantization`                                                                           | [models.Quantization](../models/quantization.md)                                         | :heavy_check_mark:                                                                       | N/A                                                                                      |
| `maxCompletionTokens`                                                                    | *number*                                                                                 | :heavy_check_mark:                                                                       | N/A                                                                                      |
| `maxPromptTokens`                                                                        | *number*                                                                                 | :heavy_check_mark:                                                                       | N/A                                                                                      |
| `supportedParameters`                                                                    | [models.EndpointsListSupportedParameter](../models/endpointslistsupportedparameter.md)[] | :heavy_check_mark:                                                                       | N/A                                                                                      |
| `status`                                                                                 | [models.EndpointsListStatus](../models/endpointsliststatus.md)                           | :heavy_minus_sign:                                                                       | N/A                                                                                      |
| `uptimeLast30m`                                                                          | *number*                                                                                 | :heavy_check_mark:                                                                       | N/A                                                                                      |
| `supportsImplicitCaching`                                                                | *boolean*                                                                                | :heavy_check_mark:                                                                       | N/A                                                                                      |