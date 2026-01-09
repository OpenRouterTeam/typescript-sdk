# ListEndpointsZdrResponse

Returns a list of endpoints

## Example Usage

```typescript
import { ListEndpointsZdrResponse } from "@openrouter/sdk/models/operations";

let value: ListEndpointsZdrResponse = {
  data: [
    {
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
      latencyLast30m: {
        p50: 0.25,
        p75: 0.35,
        p90: 0.48,
        p99: 0.85,
      },
      throughputLast30m: {
        p50: 45.2,
        p75: 38.5,
        p90: 28.3,
        p99: 15.1,
      },
    },
  ],
};
```

## Fields

| Field                                                     | Type                                                      | Required                                                  | Description                                               |
| --------------------------------------------------------- | --------------------------------------------------------- | --------------------------------------------------------- | --------------------------------------------------------- |
| `data`                                                    | [models.PublicEndpoint](../../models/publicendpoint.md)[] | :heavy_check_mark:                                        | N/A                                                       |