# ListEndpointsData

## Example Usage

```typescript
import { ListEndpointsData } from "@openrouter/sdk/models/operations";

let value: ListEndpointsData = {
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
        imageOutput: 50.89,
        audio: "<value>",
        inputAudioCache: "<value>",
        webSearch: "<value>",
        internalReasoning: 7618.12,
        inputCacheRead: 3457.82,
        inputCacheWrite: "<value>",
        discount: 388.04,
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

| Field                                                                                      | Type                                                                                       | Required                                                                                   | Description                                                                                | Example                                                                                    |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| `id`                                                                                       | *string*                                                                                   | :heavy_check_mark:                                                                         | Unique identifier for the model                                                            | openai/gpt-4                                                                               |
| `name`                                                                                     | *string*                                                                                   | :heavy_check_mark:                                                                         | Display name of the model                                                                  | GPT-4                                                                                      |
| `created`                                                                                  | *number*                                                                                   | :heavy_check_mark:                                                                         | Unix timestamp of when the model was created                                               | 1692901234                                                                                 |
| `description`                                                                              | *string*                                                                                   | :heavy_check_mark:                                                                         | Description of the model                                                                   | GPT-4 is a large multimodal model that can solve difficult problems with greater accuracy. |
| `architecture`                                                                             | [operations.Architecture](../../models/operations/architecture.md)                         | :heavy_check_mark:                                                                         | Model architecture information                                                             |                                                                                            |
| `endpoints`                                                                                | [models.PublicEndpoint](../../models/publicendpoint.md)[]                                  | :heavy_check_mark:                                                                         | List of available endpoints for this model                                                 |                                                                                            |