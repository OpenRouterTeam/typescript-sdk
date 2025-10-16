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
    prompt: "<value>",
    completion: 8892.26,
    request: "<value>",
    image: "https://picsum.photos/seed/OFc4KN9F/2036/3960",
    imageOutput: "<value>",
    audio: 2211.35,
    inputAudioCache: "<value>",
    webSearch: "<value>",
    internalReasoning: "<value>",
    inputCacheRead: 7953.16,
    inputCacheWrite: 5827.73,
    discount: 4469.95,
  },
  contextLength: 8192,
  architecture: {
    tokenizer: "Qwen3",
    instructType: "qwq",
    modality: "text",
    inputModalities: [
      "audio",
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
  supportedParameters: [],
  defaultParameters: null,
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
| `pricing`                                                                                  | [models.ModelPricing](../models/modelpricing.md)                                           | :heavy_check_mark:                                                                         | Pricing information for the model                                                          |                                                                                            |
| `contextLength`                                                                            | *number*                                                                                   | :heavy_check_mark:                                                                         | Maximum context length in tokens                                                           | 8192                                                                                       |
| `architecture`                                                                             | [models.ModelArchitecture](../models/modelarchitecture.md)                                 | :heavy_check_mark:                                                                         | Model architecture information                                                             |                                                                                            |
| `topProvider`                                                                              | [models.TopProviderInfo](../models/topproviderinfo.md)                                     | :heavy_check_mark:                                                                         | Information about the top provider for this model                                          |                                                                                            |
| `perRequestLimits`                                                                         | [models.PerRequestLimits](../models/perrequestlimits.md)                                   | :heavy_check_mark:                                                                         | Per-request token limits                                                                   |                                                                                            |
| `supportedParameters`                                                                      | [models.Parameter](../models/parameter.md)[]                                               | :heavy_check_mark:                                                                         | List of supported parameters for this model                                                |                                                                                            |
| `defaultParameters`                                                                        | [models.DefaultParameters](../models/defaultparameters.md)                                 | :heavy_check_mark:                                                                         | Default parameters for this model                                                          |                                                                                            |