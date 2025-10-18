# Model

Information about an AI model available on OpenRouter

## Example Usage

```typescript
import { Model } from "@openrouter/sdk/models";

let value: Model = {
  id: "openai/gpt-4",
  canonicalSlug: "openai/gpt-4",
  huggingFaceId: "microsoft/DialoGPT-medium",
  name: "GPT-4",
  created: 1692901234,
  description:
    "GPT-4 is a large multimodal model that can solve difficult problems with greater accuracy.",
  pricing: {
    prompt: "0.00003",
    completion: "0.00006",
    request: "0",
    image: "0",
    imageOutput: "<value>",
    audio: "<value>",
    inputAudioCache: 2592.51,
    webSearch: "<value>",
    internalReasoning: 185.78,
    inputCacheRead: 9982.06,
    inputCacheWrite: 8640.15,
    discount: 7067.31,
  },
  contextLength: 8192,
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
  topProvider: {
    contextLength: 8192,
    maxCompletionTokens: 4096,
    isModerated: true,
  },
  perRequestLimits: null,
  supportedParameters: [
    "temperature",
    "top_p",
    "max_tokens",
  ],
  defaultParameters: null,
};
```

## Fields

| Field                                                                                                                                             | Type                                                                                                                                              | Required                                                                                                                                          | Description                                                                                                                                       | Example                                                                                                                                           |
| ------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`                                                                                                                                              | *string*                                                                                                                                          | :heavy_check_mark:                                                                                                                                | Unique identifier for the model                                                                                                                   | openai/gpt-4                                                                                                                                      |
| `canonicalSlug`                                                                                                                                   | *string*                                                                                                                                          | :heavy_check_mark:                                                                                                                                | Canonical slug for the model                                                                                                                      | openai/gpt-4                                                                                                                                      |
| `huggingFaceId`                                                                                                                                   | *string*                                                                                                                                          | :heavy_minus_sign:                                                                                                                                | Hugging Face model identifier, if applicable                                                                                                      | microsoft/DialoGPT-medium                                                                                                                         |
| `name`                                                                                                                                            | *string*                                                                                                                                          | :heavy_check_mark:                                                                                                                                | Display name of the model                                                                                                                         | GPT-4                                                                                                                                             |
| `created`                                                                                                                                         | *number*                                                                                                                                          | :heavy_check_mark:                                                                                                                                | Unix timestamp of when the model was created                                                                                                      | 1692901234                                                                                                                                        |
| `description`                                                                                                                                     | *string*                                                                                                                                          | :heavy_minus_sign:                                                                                                                                | Description of the model                                                                                                                          | GPT-4 is a large multimodal model that can solve difficult problems with greater accuracy.                                                        |
| `pricing`                                                                                                                                         | [models.ModelPricing](../models/modelpricing.md)                                                                                                  | :heavy_check_mark:                                                                                                                                | Pricing information for the model                                                                                                                 |                                                                                                                                                   |
| `contextLength`                                                                                                                                   | *number*                                                                                                                                          | :heavy_check_mark:                                                                                                                                | Maximum context length in tokens                                                                                                                  | 8192                                                                                                                                              |
| `architecture`                                                                                                                                    | [models.ModelArchitecture](../models/modelarchitecture.md)                                                                                        | :heavy_check_mark:                                                                                                                                | Model architecture information                                                                                                                    | {<br/>"tokenizer": "GPT",<br/>"instruct_type": "chatml",<br/>"modality": "text-\u003etext",<br/>"input_modalities": [<br/>"text"<br/>],<br/>"output_modalities": [<br/>"text"<br/>]<br/>} |
| `topProvider`                                                                                                                                     | [models.TopProviderInfo](../models/topproviderinfo.md)                                                                                            | :heavy_check_mark:                                                                                                                                | Information about the top provider for this model                                                                                                 | {<br/>"context_length": 8192,<br/>"max_completion_tokens": 4096,<br/>"is_moderated": true<br/>}                                                   |
| `perRequestLimits`                                                                                                                                | [models.PerRequestLimits](../models/perrequestlimits.md)                                                                                          | :heavy_check_mark:                                                                                                                                | Per-request token limits                                                                                                                          |                                                                                                                                                   |
| `supportedParameters`                                                                                                                             | [models.Parameter](../models/parameter.md)[]                                                                                                      | :heavy_check_mark:                                                                                                                                | List of supported parameters for this model                                                                                                       |                                                                                                                                                   |
| `defaultParameters`                                                                                                                               | [models.DefaultParameters](../models/defaultparameters.md)                                                                                        | :heavy_check_mark:                                                                                                                                | Default parameters for this model                                                                                                                 | {<br/>"temperature": 0.7,<br/>"top_p": 0.9,<br/>"frequency_penalty": 0<br/>}                                                                      |