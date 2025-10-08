# ListResponse

Returns a list of endpoints

## Example Usage

```typescript
import { ListResponse } from "@openrouter/sdk/models/operations";

let value: ListResponse = {
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
        "image",
      ],
      outputModalities: [
        "text",
      ],
    },
    endpoints: [
      {
        name: "OpenAI GPT-4",
        modelName: "gpt-4",
        contextLength: 8192,
        pricing: {
          prompt: "0.00003",
          completion: "0.00006",
          request: 2133.83,
          image: "https://loremflickr.com/1607/3019?lock=5474974185339338",
          imageOutput: 9645.7,
          audio: 2924.38,
          inputAudioCache: "<value>",
          webSearch: "<value>",
          internalReasoning: "<value>",
          inputCacheRead: "<value>",
          inputCacheWrite: 5822.3,
          discount: 9643.52,
        },
        providerName: "OpenAI",
        tag: "featured",
        quantization: null,
        maxCompletionTokens: 4096,
        maxPromptTokens: null,
        supportedParameters: [
          "temperature",
          "max_tokens",
          "top_p",
          "frequency_penalty",
          "presence_penalty",
        ],
        status: 0,
        uptimeLast30m: 0.99,
        supportsImplicitCaching: true,
      },
    ],
  },
};
```

## Fields

| Field                                                      | Type                                                       | Required                                                   | Description                                                |
| ---------------------------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------- |
| `data`                                                     | [operations.ListData](../../models/operations/listdata.md) | :heavy_check_mark:                                         | N/A                                                        |