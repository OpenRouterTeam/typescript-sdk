# GetModelsUserData

## Example Usage

```typescript
import { GetModelsUserData } from "@openrouter/sdk/models/operations";

let value: GetModelsUserData = {
  id: "openai/gpt-4",
  canonicalSlug: "openai/gpt-4",
  huggingFaceId: "microsoft/DialoGPT-medium",
  name: "GPT-4",
  created: 1692901234,
  description:
    "GPT-4 is a large multimodal model that can solve difficult problems with greater accuracy.",
  pricing: {
    prompt: 1622.51,
    completion: 4991.02,
  },
  contextLength: 8192,
  architecture: {
    modality: "text",
    inputModalities: [
      "file",
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
};
```

## Fields

| Field                                                                                                      | Type                                                                                                       | Required                                                                                                   | Description                                                                                                | Example                                                                                                    |
| ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `id`                                                                                                       | *string*                                                                                                   | :heavy_check_mark:                                                                                         | Unique identifier for the model                                                                            | openai/gpt-4                                                                                               |
| `canonicalSlug`                                                                                            | *string*                                                                                                   | :heavy_check_mark:                                                                                         | Canonical slug for the model                                                                               | openai/gpt-4                                                                                               |
| `huggingFaceId`                                                                                            | *string*                                                                                                   | :heavy_minus_sign:                                                                                         | Hugging Face model identifier, if applicable                                                               | microsoft/DialoGPT-medium                                                                                  |
| `name`                                                                                                     | *string*                                                                                                   | :heavy_check_mark:                                                                                         | Display name of the model                                                                                  | GPT-4                                                                                                      |
| `created`                                                                                                  | *number*                                                                                                   | :heavy_check_mark:                                                                                         | Unix timestamp of when the model was created                                                               | 1692901234                                                                                                 |
| `description`                                                                                              | *string*                                                                                                   | :heavy_minus_sign:                                                                                         | Description of the model                                                                                   | GPT-4 is a large multimodal model that can solve difficult problems with greater accuracy.                 |
| `pricing`                                                                                                  | [operations.GetModelsUserPricing](../../models/operations/getmodelsuserpricing.md)                         | :heavy_check_mark:                                                                                         | Pricing information for the model                                                                          |                                                                                                            |
| `contextLength`                                                                                            | *number*                                                                                                   | :heavy_check_mark:                                                                                         | Maximum context length in tokens                                                                           | 8192                                                                                                       |
| `architecture`                                                                                             | [operations.GetModelsUserArchitecture](../../models/operations/getmodelsuserarchitecture.md)               | :heavy_check_mark:                                                                                         | Model architecture information                                                                             |                                                                                                            |
| `topProvider`                                                                                              | [operations.GetModelsUserTopProvider](../../models/operations/getmodelsusertopprovider.md)                 | :heavy_check_mark:                                                                                         | Information about the top provider for this model                                                          |                                                                                                            |
| `perRequestLimits`                                                                                         | [operations.GetModelsUserPerRequestLimits](../../models/operations/getmodelsuserperrequestlimits.md)       | :heavy_check_mark:                                                                                         | Per-request token limits                                                                                   |                                                                                                            |
| `supportedParameters`                                                                                      | [operations.GetModelsUserSupportedParameter](../../models/operations/getmodelsusersupportedparameter.md)[] | :heavy_check_mark:                                                                                         | List of supported parameters for this model                                                                |                                                                                                            |