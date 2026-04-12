# ListEndpointsZdrResponse

Returns a list of endpoints

## Example Usage

```typescript
import { ListEndpointsZdrResponse } from "@openrouter/sdk/models/operations";

let value: ListEndpointsZdrResponse = {
  data: [
    {
      contextLength: 8192,
      latencyLast30m: {
        p50: 0.25,
        p75: 0.35,
        p90: 0.48,
        p99: 0.85,
      },
      maxCompletionTokens: 4096,
      maxPromptTokens: 8192,
      modelId: "openai/gpt-4",
      modelName: "GPT-4",
      name: "OpenAI: GPT-4",
      pricing: {
        completion: "0.00006",
        prompt: "0.00003",
      },
      providerName: "OpenAI",
      quantization: "fp16",
      supportedParameters: [
        "temperature",
        "top_p",
        "max_tokens",
      ],
      supportsImplicitCaching: true,
      tag: "openai",
      throughputLast30m: {
        p50: 45.2,
        p75: 38.5,
        p90: 28.3,
        p99: 15.1,
      },
      uptimeLast1d: 99.8,
      uptimeLast30m: 99.5,
      uptimeLast5m: 100,
    },
  ],
};
```

## Fields

| Field                                                     | Type                                                      | Required                                                  | Description                                               |
| --------------------------------------------------------- | --------------------------------------------------------- | --------------------------------------------------------- | --------------------------------------------------------- |
| `data`                                                    | [models.PublicEndpoint](../../models/publicendpoint.md)[] | :heavy_check_mark:                                        | N/A                                                       |