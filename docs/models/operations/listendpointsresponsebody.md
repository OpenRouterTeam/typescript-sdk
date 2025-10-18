# ListEndpointsResponseBody

Returns a list of endpoints

## Example Usage

```typescript
import { ListEndpointsResponseBody } from "@openrouter/sdk/models/operations";

let value: ListEndpointsResponseBody = {
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
          inputAudioCache: "<value>",
          webSearch: "<value>",
          internalReasoning: "<value>",
          inputCacheRead: "<value>",
          inputCacheWrite: 5536.24,
          discount: 9541.49,
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