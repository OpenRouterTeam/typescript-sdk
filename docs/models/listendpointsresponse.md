# ListEndpointsResponse

List of available endpoints for a model

## Example Usage

```typescript
import { ListEndpointsResponse } from "@openrouter/sdk/models";

let value: ListEndpointsResponse = {
  id: "openai/gpt-4",
  name: "GPT-4",
  created: 1692901234,
  description:
    "GPT-4 is a large multimodal model that can solve difficult problems with greater accuracy.",
  architecture: {
    tokenizer: "GPT",
    instructType: "chatml",
    modality: "text->text",
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
        "frequency_penalty",
        "presence_penalty",
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

| Field                                                                                                                                             | Type                                                                                                                                              | Required                                                                                                                                          | Description                                                                                                                                       | Example                                                                                                                                           |
| ------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`                                                                                                                                              | *string*                                                                                                                                          | :heavy_check_mark:                                                                                                                                | Unique identifier for the model                                                                                                                   | openai/gpt-4                                                                                                                                      |
| `name`                                                                                                                                            | *string*                                                                                                                                          | :heavy_check_mark:                                                                                                                                | Display name of the model                                                                                                                         | GPT-4                                                                                                                                             |
| `created`                                                                                                                                         | *number*                                                                                                                                          | :heavy_check_mark:                                                                                                                                | Unix timestamp of when the model was created                                                                                                      | 1692901234                                                                                                                                        |
| `description`                                                                                                                                     | *string*                                                                                                                                          | :heavy_check_mark:                                                                                                                                | Description of the model                                                                                                                          | GPT-4 is a large multimodal model that can solve difficult problems with greater accuracy.                                                        |
| `architecture`                                                                                                                                    | [models.Architecture](../models/architecture.md)                                                                                                  | :heavy_check_mark:                                                                                                                                | N/A                                                                                                                                               | {<br/>"tokenizer": "GPT",<br/>"instruct_type": "chatml",<br/>"modality": "text-\u003etext",<br/>"input_modalities": [<br/>"text"<br/>],<br/>"output_modalities": [<br/>"text"<br/>]<br/>} |
| `endpoints`                                                                                                                                       | [models.PublicEndpoint](../models/publicendpoint.md)[]                                                                                            | :heavy_check_mark:                                                                                                                                | List of available endpoints for this model                                                                                                        |                                                                                                                                                   |