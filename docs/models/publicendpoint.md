# PublicEndpoint

Information about a specific model endpoint

## Example Usage

```typescript
import { PublicEndpoint } from "@openrouter/sdk/models";

let value: PublicEndpoint = {
  name: "<value>",
  modelName: "<value>",
  contextLength: 6987.3,
  pricing: {
    prompt: "<value>",
    completion: "<value>",
    request: 4487.12,
    image: 7285.01,
    imageOutput: 7293.72,
    audio: "<value>",
    inputAudioCache: "<value>",
    webSearch: 8364.54,
    internalReasoning: "<value>",
    inputCacheRead: "<value>",
    inputCacheWrite: "<value>",
    discount: 8394.77,
  },
  providerName: "Minimax",
  tag: "<value>",
  quantization: "fp6",
  maxCompletionTokens: 4640.78,
  maxPromptTokens: 6580.71,
  supportedParameters: [
    "top_p",
  ],
  status: -3,
  uptimeLast30m: 9674.1,
  supportsImplicitCaching: false,
};
```

## Fields

| Field                                                                        | Type                                                                         | Required                                                                     | Description                                                                  |
| ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `name`                                                                       | *string*                                                                     | :heavy_check_mark:                                                           | N/A                                                                          |
| `modelName`                                                                  | *string*                                                                     | :heavy_check_mark:                                                           | N/A                                                                          |
| `contextLength`                                                              | *number*                                                                     | :heavy_check_mark:                                                           | N/A                                                                          |
| `pricing`                                                                    | [models.PublicEndpointPricing](../models/publicendpointpricing.md)           | :heavy_check_mark:                                                           | N/A                                                                          |
| `providerName`                                                               | [models.ProviderName](../models/providername.md)                             | :heavy_check_mark:                                                           | N/A                                                                          |
| `tag`                                                                        | *string*                                                                     | :heavy_check_mark:                                                           | N/A                                                                          |
| `quantization`                                                               | [models.PublicEndpointQuantization](../models/publicendpointquantization.md) | :heavy_check_mark:                                                           | N/A                                                                          |
| `maxCompletionTokens`                                                        | *number*                                                                     | :heavy_check_mark:                                                           | N/A                                                                          |
| `maxPromptTokens`                                                            | *number*                                                                     | :heavy_check_mark:                                                           | N/A                                                                          |
| `supportedParameters`                                                        | [models.Parameter](../models/parameter.md)[]                                 | :heavy_check_mark:                                                           | N/A                                                                          |
| `status`                                                                     | [models.EndpointStatus](../models/endpointstatus.md)                         | :heavy_minus_sign:                                                           | N/A                                                                          |
| `uptimeLast30m`                                                              | *number*                                                                     | :heavy_check_mark:                                                           | N/A                                                                          |
| `supportsImplicitCaching`                                                    | *boolean*                                                                    | :heavy_check_mark:                                                           | N/A                                                                          |