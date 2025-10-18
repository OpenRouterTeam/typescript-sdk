# ListEndpointsZdrResponseBody

Returns a list of endpoints

## Example Usage

```typescript
import { ListEndpointsZdrResponseBody } from "@openrouter/sdk/models/operations";

let value: ListEndpointsZdrResponseBody = {
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
        imageOutput: "<value>",
        audio: 199.71,
        inputAudioCache: "<value>",
        webSearch: "<value>",
        internalReasoning: 9791.42,
        inputCacheRead: 6765.93,
        inputCacheWrite: "<value>",
        discount: 7905.75,
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