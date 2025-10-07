# ListModelsData

## Example Usage

```typescript
import { ListModelsData } from "@openrouter/sdk/models/operations";

let value: ListModelsData = {
  id: "openai/gpt-4",
  canonicalSlug: "openai/gpt-4",
  huggingFaceId: "microsoft/DialoGPT-medium",
  name: "GPT-4",
  created: 1692901234,
  description:
    "GPT-4 is a large multimodal model that can solve difficult problems with greater accuracy.",
  pricing: {
    prompt: "<value>",
    completion: "<value>",
    request: "<value>",
    image: "https://picsum.photos/seed/5TFP9UbPFT/451/935",
    imageOutput: 7533.47,
    audio: "<value>",
    inputAudioCache: "<value>",
    webSearch: "<value>",
    internalReasoning: 4426.27,
    inputCacheRead: 1776.31,
    inputCacheWrite: 2337.25,
    discount: 355.04,
  },
  contextLength: 8192,
  architecture: {
    tokenizer: "Llama2",
    instructType: "qwen3",
    modality: "text",
    inputModalities: [
      "audio",
    ],
    outputModalities: [],
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
    temperature: 5064.85,
    topP: 6091.89,
    frequencyPenalty: 1538.78,
  },
};
```

## Fields

| Field                                                                                                | Type                                                                                                 | Required                                                                                             | Description                                                                                          | Example                                                                                              |
| ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `id`                                                                                                 | *string*                                                                                             | :heavy_check_mark:                                                                                   | Unique identifier for the model                                                                      | openai/gpt-4                                                                                         |
| `canonicalSlug`                                                                                      | *string*                                                                                             | :heavy_check_mark:                                                                                   | Canonical slug for the model                                                                         | openai/gpt-4                                                                                         |
| `huggingFaceId`                                                                                      | *string*                                                                                             | :heavy_minus_sign:                                                                                   | Hugging Face model identifier, if applicable                                                         | microsoft/DialoGPT-medium                                                                            |
| `name`                                                                                               | *string*                                                                                             | :heavy_check_mark:                                                                                   | Display name of the model                                                                            | GPT-4                                                                                                |
| `created`                                                                                            | *number*                                                                                             | :heavy_check_mark:                                                                                   | Unix timestamp of when the model was created                                                         | 1692901234                                                                                           |
| `description`                                                                                        | *string*                                                                                             | :heavy_minus_sign:                                                                                   | Description of the model                                                                             | GPT-4 is a large multimodal model that can solve difficult problems with greater accuracy.           |
| `pricing`                                                                                            | [operations.ListModelsPricing](../../models/operations/listmodelspricing.md)                         | :heavy_check_mark:                                                                                   | Pricing information for the model                                                                    |                                                                                                      |
| `contextLength`                                                                                      | *number*                                                                                             | :heavy_check_mark:                                                                                   | Maximum context length in tokens                                                                     | 8192                                                                                                 |
| `architecture`                                                                                       | [operations.ListModelsArchitecture](../../models/operations/listmodelsarchitecture.md)               | :heavy_check_mark:                                                                                   | Model architecture information                                                                       |                                                                                                      |
| `topProvider`                                                                                        | [operations.ListModelsTopProvider](../../models/operations/listmodelstopprovider.md)                 | :heavy_check_mark:                                                                                   | Information about the top provider for this model                                                    |                                                                                                      |
| `perRequestLimits`                                                                                   | [operations.ListModelsPerRequestLimits](../../models/operations/listmodelsperrequestlimits.md)       | :heavy_check_mark:                                                                                   | Per-request token limits                                                                             |                                                                                                      |
| `supportedParameters`                                                                                | [operations.ListModelsSupportedParameter](../../models/operations/listmodelssupportedparameter.md)[] | :heavy_check_mark:                                                                                   | List of supported parameters for this model                                                          |                                                                                                      |
| `defaultParameters`                                                                                  | [operations.ListModelsDefaultParameters](../../models/operations/listmodelsdefaultparameters.md)     | :heavy_check_mark:                                                                                   | Default parameters for this model                                                                    |                                                                                                      |