# ModelsList

## Example Usage

```typescript
import { ModelsList } from "@openrouter/sdk/models";

let value: ModelsList = {
  id: "openai/gpt-4",
  canonicalSlug: "openai/gpt-4",
  huggingFaceId: "microsoft/DialoGPT-medium",
  name: "GPT-4",
  created: 1692901234,
  description:
    "GPT-4 is a large multimodal model that can solve difficult problems with greater accuracy.",
  pricing: {
    prompt: "<value>",
    completion: 8010.08,
    request: "<value>",
    image: "https://loremflickr.com/3198/3756?lock=6854824011730044",
    imageOutput: "<value>",
    audio: "<value>",
    inputAudioCache: 2073.1,
    webSearch: 7048.33,
    internalReasoning: "<value>",
    inputCacheRead: "<value>",
    inputCacheWrite: "<value>",
    discount: 7092.02,
  },
  contextLength: 8192,
  architecture: {
    tokenizer: "DeepSeek",
    instructType: "deepseek-v3.1",
    modality: "text",
    inputModalities: [
      "file",
    ],
    outputModalities: [
      "embeddings",
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
  supportedParameters: [],
  defaultParameters: {
    temperature: 8538.64,
    topP: 7627.43,
    frequencyPenalty: null,
  },
};
```

## Fields

| Field                                                                                      | Type                                                                                       | Required                                                                                   | Description                                                                                | Example                                                                                    |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| `id`                                                                                       | *string*                                                                                   | :heavy_check_mark:                                                                         | Unique identifier for the model                                                            | openai/gpt-4                                                                               |
| `canonicalSlug`                                                                            | *string*                                                                                   | :heavy_check_mark:                                                                         | Canonical slug for the model                                                               | openai/gpt-4                                                                               |
| `huggingFaceId`                                                                            | *string*                                                                                   | :heavy_minus_sign:                                                                         | Hugging Face model identifier, if applicable                                               | microsoft/DialoGPT-medium                                                                  |
| `name`                                                                                     | *string*                                                                                   | :heavy_check_mark:                                                                         | Display name of the model                                                                  | GPT-4                                                                                      |
| `created`                                                                                  | *number*                                                                                   | :heavy_check_mark:                                                                         | Unix timestamp of when the model was created                                               | 1692901234                                                                                 |
| `description`                                                                              | *string*                                                                                   | :heavy_minus_sign:                                                                         | Description of the model                                                                   | GPT-4 is a large multimodal model that can solve difficult problems with greater accuracy. |
| `pricing`                                                                                  | [models.ModelsListPricing](../models/modelslistpricing.md)                                 | :heavy_check_mark:                                                                         | Pricing information for the model                                                          |                                                                                            |
| `contextLength`                                                                            | *number*                                                                                   | :heavy_check_mark:                                                                         | Maximum context length in tokens                                                           | 8192                                                                                       |
| `architecture`                                                                             | [models.Architecture](../models/architecture.md)                                           | :heavy_check_mark:                                                                         | Model architecture information                                                             |                                                                                            |
| `topProvider`                                                                              | [models.TopProvider](../models/topprovider.md)                                             | :heavy_check_mark:                                                                         | Information about the top provider for this model                                          |                                                                                            |
| `perRequestLimits`                                                                         | [models.PerRequestLimits](../models/perrequestlimits.md)                                   | :heavy_check_mark:                                                                         | Per-request token limits                                                                   |                                                                                            |
| `supportedParameters`                                                                      | [models.ModelsListSupportedParameter](../models/modelslistsupportedparameter.md)[]         | :heavy_check_mark:                                                                         | List of supported parameters for this model                                                |                                                                                            |
| `defaultParameters`                                                                        | [models.DefaultParameters](../models/defaultparameters.md)                                 | :heavy_check_mark:                                                                         | Default parameters for this model                                                          |                                                                                            |