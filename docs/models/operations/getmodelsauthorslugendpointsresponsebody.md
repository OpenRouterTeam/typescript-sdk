# GetModelsAuthorSlugEndpointsResponseBody

Returns a list of endpoints

## Example Usage

```typescript
import { GetModelsAuthorSlugEndpointsResponseBody } from "open-router/models/operations";

let value: GetModelsAuthorSlugEndpointsResponseBody = {
  data: {
    id: "openai/gpt-4",
    name: "GPT-4",
    created: 1692901234,
    description:
      "GPT-4 is a large multimodal model that can solve difficult problems with greater accuracy.",
    architecture: {
      tokenizer: "Media",
      instructType: "gemma",
      modality: "text",
      inputModalities: [],
      outputModalities: [],
    },
    endpoints: [
      {
        name: "<value>",
        modelName: "<value>",
        contextLength: 8400.17,
        pricing: {
          prompt: "<value>",
          completion: "<value>",
        },
        providerName: "Featherless",
        tag: "<value>",
        quantization: "bf16",
        maxCompletionTokens: 5927.51,
        maxPromptTokens: 4247.2,
        supportedParameters: [
          "frequency_penalty",
        ],
        uptimeLast30m: 2818.25,
        supportsImplicitCaching: false,
      },
    ],
  },
};
```

## Fields

| Field                                                                                                      | Type                                                                                                       | Required                                                                                                   | Description                                                                                                |
| ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `data`                                                                                                     | [operations.GetModelsAuthorSlugEndpointsData](../../models/operations/getmodelsauthorslugendpointsdata.md) | :heavy_check_mark:                                                                                         | N/A                                                                                                        |