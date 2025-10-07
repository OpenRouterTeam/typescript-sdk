# Endpoint

## Example Usage

```typescript
import { Endpoint } from "@openrouter/sdk/models/operations";

let value: Endpoint = {
  name: "<value>",
  modelName: "<value>",
  contextLength: 9771.17,
  pricing: {
    prompt: "<value>",
    completion: "<value>",
    request: "<value>",
    image: 4207.69,
    imageOutput: "<value>",
    audio: 5326.87,
    inputAudioCache: 1169.01,
    webSearch: 4331.45,
    internalReasoning: "<value>",
    inputCacheRead: "<value>",
    inputCacheWrite: "<value>",
    discount: 3455.11,
  },
  providerName: "Enfer",
  tag: "<value>",
  quantization: "fp4",
  maxCompletionTokens: 2624.06,
  maxPromptTokens: 5797.23,
  supportedParameters: [],
  status: -3,
  uptimeLast30m: 802.05,
  supportsImplicitCaching: false,
};
```

## Fields

| Field                                                                                    | Type                                                                                     | Required                                                                                 | Description                                                                              |
| ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `name`                                                                                   | *string*                                                                                 | :heavy_check_mark:                                                                       | N/A                                                                                      |
| `modelName`                                                                              | *string*                                                                                 | :heavy_check_mark:                                                                       | N/A                                                                                      |
| `contextLength`                                                                          | *number*                                                                                 | :heavy_check_mark:                                                                       | N/A                                                                                      |
| `pricing`                                                                                | [operations.ListPricing](../../models/operations/listpricing.md)                         | :heavy_check_mark:                                                                       | N/A                                                                                      |
| `providerName`                                                                           | [operations.ListProviderName](../../models/operations/listprovidername.md)               | :heavy_check_mark:                                                                       | N/A                                                                                      |
| `tag`                                                                                    | *string*                                                                                 | :heavy_check_mark:                                                                       | N/A                                                                                      |
| `quantization`                                                                           | [operations.ListQuantization](../../models/operations/listquantization.md)               | :heavy_check_mark:                                                                       | N/A                                                                                      |
| `maxCompletionTokens`                                                                    | *number*                                                                                 | :heavy_check_mark:                                                                       | N/A                                                                                      |
| `maxPromptTokens`                                                                        | *number*                                                                                 | :heavy_check_mark:                                                                       | N/A                                                                                      |
| `supportedParameters`                                                                    | [operations.ListSupportedParameter](../../models/operations/listsupportedparameter.md)[] | :heavy_check_mark:                                                                       | N/A                                                                                      |
| `status`                                                                                 | [operations.ListStatus](../../models/operations/liststatus.md)                           | :heavy_minus_sign:                                                                       | N/A                                                                                      |
| `uptimeLast30m`                                                                          | *number*                                                                                 | :heavy_check_mark:                                                                       | N/A                                                                                      |
| `supportsImplicitCaching`                                                                | *boolean*                                                                                | :heavy_check_mark:                                                                       | N/A                                                                                      |