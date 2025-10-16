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
      tokenizer: null,
      instructType: null,
      modality: "text",
      inputModalities: [
        "file",
      ],
      outputModalities: [
        "text",
      ],
    },
    endpoints: [
      {
        name: "<value>",
        modelName: "<value>",
        contextLength: 648.47,
        pricing: {
          prompt: "<value>",
          completion: "<value>",
          request: 4487.12,
          image: 7285.01,
          imageOutput: 7293.72,
          audio: "<value>",
          inputAudioCache: "<value>",
          webSearch: 8364.54,
          internalReasoning: "<value>",
          inputCacheRead: "<value>",
          inputCacheWrite: "<value>",
          discount: 8394.77,
        },
        providerName: "Cohere",
        tag: "<value>",
        quantization: "fp6",
        maxCompletionTokens: 7441.05,
        maxPromptTokens: 7949.82,
        supportedParameters: [
          "web_search_options",
        ],
        status: -3,
        uptimeLast30m: null,
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