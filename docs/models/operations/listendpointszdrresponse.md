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
        request: "0",
        image: "0",
        imageOutput: 1000,
        audio: 1000,
        inputAudioCache: 1000,
        webSearch: 1000,
        internalReasoning: 1000,
        inputCacheRead: 1000,
        inputCacheWrite: 1000,
        discount: 2041.73,
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
      status: 0,
      uptimeLast30m: 99.5,
      supportsImplicitCaching: true,
    },
  ],
};
```

## Fields

| Field                                                     | Type                                                      | Required                                                  | Description                                               |
| --------------------------------------------------------- | --------------------------------------------------------- | --------------------------------------------------------- | --------------------------------------------------------- |
| `data`                                                    | [models.PublicEndpoint](../../models/publicendpoint.md)[] | :heavy_check_mark:                                        | N/A                                                       |