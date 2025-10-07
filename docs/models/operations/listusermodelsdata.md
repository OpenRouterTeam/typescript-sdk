# ListUserModelsData

## Example Usage

```typescript
import { ListUserModelsData } from "@openrouter/sdk/models/operations";

let value: ListUserModelsData = {
  id: "openai/gpt-4",
  canonicalSlug: "openai/gpt-4",
  huggingFaceId: "microsoft/DialoGPT-medium",
  name: "GPT-4",
  created: 1692901234,
  description:
    "GPT-4 is a large multimodal model that can solve difficult problems with greater accuracy.",
  pricing: {
    prompt: "<value>",
    completion: 7998.78,
    request: "<value>",
    image: 2469.07,
    imageOutput: 1538.88,
    audio: 5481.95,
    inputAudioCache: 5042.58,
    webSearch: "<value>",
    internalReasoning: "<value>",
    inputCacheRead: "<value>",
    inputCacheWrite: "<value>",
    discount: 7216.19,
  },
  contextLength: 8192,
  architecture: {
    tokenizer: "Media",
    instructType: "code-llama",
    modality: "text",
    inputModalities: [
      "image",
    ],
    outputModalities: [
      "image",
    ],
  },
  topProvider: {
    contextLength: 8192,
    maxCompletionTokens: 4096,
    isModerated: true,
  },
  perRequestLimits: {
    promptTokens: "<value>",
    completionTokens: "<value>",
  },
  supportedParameters: [
    "presence_penalty",
  ],
  defaultParameters: {
    temperature: 6737.46,
    topP: 8755.85,
    frequencyPenalty: null,
  },
};
```

## Fields

| Field                                                                                                        | Type                                                                                                         | Required                                                                                                     | Description                                                                                                  | Example                                                                                                      |
| ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------ |
| `id`                                                                                                         | *string*                                                                                                     | :heavy_check_mark:                                                                                           | Unique identifier for the model                                                                              | openai/gpt-4                                                                                                 |
| `canonicalSlug`                                                                                              | *string*                                                                                                     | :heavy_check_mark:                                                                                           | Canonical slug for the model                                                                                 | openai/gpt-4                                                                                                 |
| `huggingFaceId`                                                                                              | *string*                                                                                                     | :heavy_minus_sign:                                                                                           | Hugging Face model identifier, if applicable                                                                 | microsoft/DialoGPT-medium                                                                                    |
| `name`                                                                                                       | *string*                                                                                                     | :heavy_check_mark:                                                                                           | Display name of the model                                                                                    | GPT-4                                                                                                        |
| `created`                                                                                                    | *number*                                                                                                     | :heavy_check_mark:                                                                                           | Unix timestamp of when the model was created                                                                 | 1692901234                                                                                                   |
| `description`                                                                                                | *string*                                                                                                     | :heavy_minus_sign:                                                                                           | Description of the model                                                                                     | GPT-4 is a large multimodal model that can solve difficult problems with greater accuracy.                   |
| `pricing`                                                                                                    | [operations.ListUserModelsPricing](../../models/operations/listusermodelspricing.md)                         | :heavy_check_mark:                                                                                           | Pricing information for the model                                                                            |                                                                                                              |
| `contextLength`                                                                                              | *number*                                                                                                     | :heavy_check_mark:                                                                                           | Maximum context length in tokens                                                                             | 8192                                                                                                         |
| `architecture`                                                                                               | [operations.ListUserModelsArchitecture](../../models/operations/listusermodelsarchitecture.md)               | :heavy_check_mark:                                                                                           | Model architecture information                                                                               |                                                                                                              |
| `topProvider`                                                                                                | [operations.ListUserModelsTopProvider](../../models/operations/listusermodelstopprovider.md)                 | :heavy_check_mark:                                                                                           | Information about the top provider for this model                                                            |                                                                                                              |
| `perRequestLimits`                                                                                           | [operations.ListUserModelsPerRequestLimits](../../models/operations/listusermodelsperrequestlimits.md)       | :heavy_check_mark:                                                                                           | Per-request token limits                                                                                     |                                                                                                              |
| `supportedParameters`                                                                                        | [operations.ListUserModelsSupportedParameter](../../models/operations/listusermodelssupportedparameter.md)[] | :heavy_check_mark:                                                                                           | List of supported parameters for this model                                                                  |                                                                                                              |
| `defaultParameters`                                                                                          | [operations.ListUserModelsDefaultParameters](../../models/operations/listusermodelsdefaultparameters.md)     | :heavy_check_mark:                                                                                           | Default parameters for this model                                                                            |                                                                                                              |