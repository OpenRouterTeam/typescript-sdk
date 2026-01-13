# PublicEndpoint

Information about a specific model endpoint

## Example Usage

```typescript
import { PublicEndpoint } from "@openrouter/sdk/models";

let value: PublicEndpoint = {
  name: "OpenAI: GPT-4",
  modelName: "GPT-4",
  contextLength: 8192,
  pricing: {
    prompt: "0.00003",
    completion: "0.00006",
  },
  providerName: "OpenAI",
  tag: "openai",
  quantization: "fp16",
  maxCompletionTokens: 4096,
  maxPromptTokens: 8192,
  supportedParameters: [
    "temperature",
    "top_p",
    "max_tokens",
  ],
  uptimeLast30m: 99.5,
  supportsImplicitCaching: true,
};
```

## Fields

| Field                                                                        | Type                                                                         | Required                                                                     | Description                                                                  | Example                                                                      |
| ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `name`                                                                       | *string*                                                                     | :heavy_check_mark:                                                           | N/A                                                                          |                                                                              |
| `modelName`                                                                  | *string*                                                                     | :heavy_check_mark:                                                           | N/A                                                                          |                                                                              |
| `contextLength`                                                              | *number*                                                                     | :heavy_check_mark:                                                           | N/A                                                                          |                                                                              |
| `pricing`                                                                    | [models.Pricing](../models/pricing.md)                                       | :heavy_check_mark:                                                           | N/A                                                                          |                                                                              |
| `providerName`                                                               | [models.ProviderName](../models/providername.md)                             | :heavy_check_mark:                                                           | N/A                                                                          | OpenAI                                                                       |
| `tag`                                                                        | *string*                                                                     | :heavy_check_mark:                                                           | N/A                                                                          |                                                                              |
| `quantization`                                                               | [models.PublicEndpointQuantization](../models/publicendpointquantization.md) | :heavy_check_mark:                                                           | N/A                                                                          | fp16                                                                         |
| `maxCompletionTokens`                                                        | *number*                                                                     | :heavy_check_mark:                                                           | N/A                                                                          |                                                                              |
| `maxPromptTokens`                                                            | *number*                                                                     | :heavy_check_mark:                                                           | N/A                                                                          |                                                                              |
| `supportedParameters`                                                        | [models.Parameter](../models/parameter.md)[]                                 | :heavy_check_mark:                                                           | N/A                                                                          |                                                                              |
| `status`                                                                     | [models.EndpointStatus](../models/endpointstatus.md)                         | :heavy_minus_sign:                                                           | N/A                                                                          | 0                                                                            |
| `uptimeLast30m`                                                              | *number*                                                                     | :heavy_check_mark:                                                           | N/A                                                                          |                                                                              |
| `supportsImplicitCaching`                                                    | *boolean*                                                                    | :heavy_check_mark:                                                           | N/A                                                                          |                                                                              |