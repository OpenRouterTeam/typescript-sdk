# ProviderResponse

Details of a provider response for a generation attempt

## Example Usage

```typescript
import { ProviderResponse } from "@openrouter/sdk/models";

let value: ProviderResponse = {
  status: 200,
};
```

## Fields

| Field                                                                            | Type                                                                             | Required                                                                         | Description                                                                      | Example                                                                          |
| -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `endpointId`                                                                     | *string*                                                                         | :heavy_minus_sign:                                                               | Internal endpoint identifier                                                     | ep_abc123                                                                        |
| `id`                                                                             | *string*                                                                         | :heavy_minus_sign:                                                               | Upstream provider response identifier                                            | chatcmpl-abc123                                                                  |
| `isByok`                                                                         | *boolean*                                                                        | :heavy_minus_sign:                                                               | Whether the request used a bring-your-own-key                                    | false                                                                            |
| `latency`                                                                        | *number*                                                                         | :heavy_minus_sign:                                                               | Response latency in milliseconds                                                 | 1200                                                                             |
| `modelPermaslug`                                                                 | *string*                                                                         | :heavy_minus_sign:                                                               | Canonical model slug                                                             | openai/gpt-4                                                                     |
| `providerName`                                                                   | [models.ProviderResponseProviderName](../models/providerresponseprovidername.md) | :heavy_minus_sign:                                                               | Name of the provider                                                             | OpenAI                                                                           |
| `status`                                                                         | *number*                                                                         | :heavy_check_mark:                                                               | HTTP status code from the provider                                               | 200                                                                              |