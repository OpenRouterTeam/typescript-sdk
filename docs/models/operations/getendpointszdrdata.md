# GetEndpointsZdrData

## Example Usage

```typescript
import { GetEndpointsZdrData } from "@openrouter/sdk/models/operations";

let value: GetEndpointsZdrData = {
  name: "<value>",
  modelName: "<value>",
  contextLength: 5458.36,
  pricing: {
    prompt: "<value>",
    completion: 4963.6,
  },
  providerName: "Crusoe",
  tag: "<value>",
  quantization: "fp8",
  maxCompletionTokens: 4173.89,
  maxPromptTokens: 5992.04,
  supportedParameters: [
    "top_a",
  ],
  uptimeLast30m: 5871.33,
  supportsImplicitCaching: false,
};
```

## Fields

| Field                                                                                                          | Type                                                                                                           | Required                                                                                                       | Description                                                                                                    |
| -------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `name`                                                                                                         | *string*                                                                                                       | :heavy_check_mark:                                                                                             | N/A                                                                                                            |
| `modelName`                                                                                                    | *string*                                                                                                       | :heavy_check_mark:                                                                                             | N/A                                                                                                            |
| `contextLength`                                                                                                | *number*                                                                                                       | :heavy_check_mark:                                                                                             | N/A                                                                                                            |
| `pricing`                                                                                                      | [operations.GetEndpointsZdrPricing](../../models/operations/getendpointszdrpricing.md)                         | :heavy_check_mark:                                                                                             | N/A                                                                                                            |
| `providerName`                                                                                                 | [operations.GetEndpointsZdrProviderName](../../models/operations/getendpointszdrprovidername.md)               | :heavy_check_mark:                                                                                             | N/A                                                                                                            |
| `tag`                                                                                                          | *string*                                                                                                       | :heavy_check_mark:                                                                                             | N/A                                                                                                            |
| `quantization`                                                                                                 | [operations.GetEndpointsZdrQuantization](../../models/operations/getendpointszdrquantization.md)               | :heavy_check_mark:                                                                                             | N/A                                                                                                            |
| `maxCompletionTokens`                                                                                          | *number*                                                                                                       | :heavy_check_mark:                                                                                             | N/A                                                                                                            |
| `maxPromptTokens`                                                                                              | *number*                                                                                                       | :heavy_check_mark:                                                                                             | N/A                                                                                                            |
| `supportedParameters`                                                                                          | [operations.GetEndpointsZdrSupportedParameter](../../models/operations/getendpointszdrsupportedparameter.md)[] | :heavy_check_mark:                                                                                             | N/A                                                                                                            |
| `status`                                                                                                       | [operations.GetEndpointsZdrStatus](../../models/operations/getendpointszdrstatus.md)                           | :heavy_minus_sign:                                                                                             | N/A                                                                                                            |
| `uptimeLast30m`                                                                                                | *number*                                                                                                       | :heavy_check_mark:                                                                                             | N/A                                                                                                            |
| `supportsImplicitCaching`                                                                                      | *boolean*                                                                                                      | :heavy_check_mark:                                                                                             | N/A                                                                                                            |