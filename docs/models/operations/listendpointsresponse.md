# ListEndpointsResponse

Returns a list of endpoints

## Example Usage

```typescript
import { ListEndpointsResponse } from "@openrouter/sdk/models/operations";

let value: ListEndpointsResponse = {
  data: {
    id: "openai/gpt-4",
    name: "GPT-4",
    created: 1692901234,
    description:
      "GPT-4 is a large multimodal model that can solve difficult problems with greater accuracy.",
    architecture: {
      tokenizer: "GPT",
      instructType: "chatml",
      modality: "text",
      inputModalities: [
        "text",
      ],
      outputModalities: [
        "text",
      ],
    },
    endpoints: [
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
          audio: "<value>",
          inputAudioCache: 1680.97,
          webSearch: "<value>",
          internalReasoning: 2716.81,
          inputCacheRead: 8244.1,
          inputCacheWrite: 5146.35,
          discount: 8299.01,
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
  },
};
```

## Fields

| Field                                                                        | Type                                                                         | Required                                                                     | Description                                                                  |
| ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `data`                                                                       | [operations.ListEndpointsData](../../models/operations/listendpointsdata.md) | :heavy_check_mark:                                                           | N/A                                                                          |