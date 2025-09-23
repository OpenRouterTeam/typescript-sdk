# GetModelsAuthorSlugEndpointsData

## Example Usage

```typescript
import { GetModelsAuthorSlugEndpointsData } from "@openrouter/sdk/models/operations";

let value: GetModelsAuthorSlugEndpointsData = {
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
  endpoints: [],
};
```

## Fields

| Field                                                                                                                      | Type                                                                                                                       | Required                                                                                                                   | Description                                                                                                                | Example                                                                                                                    |
| -------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `id`                                                                                                                       | *string*                                                                                                                   | :heavy_check_mark:                                                                                                         | Unique identifier for the model                                                                                            | openai/gpt-4                                                                                                               |
| `name`                                                                                                                     | *string*                                                                                                                   | :heavy_check_mark:                                                                                                         | Display name of the model                                                                                                  | GPT-4                                                                                                                      |
| `created`                                                                                                                  | *number*                                                                                                                   | :heavy_check_mark:                                                                                                         | Unix timestamp of when the model was created                                                                               | 1692901234                                                                                                                 |
| `description`                                                                                                              | *string*                                                                                                                   | :heavy_check_mark:                                                                                                         | Description of the model                                                                                                   | GPT-4 is a large multimodal model that can solve difficult problems with greater accuracy.                                 |
| `architecture`                                                                                                             | [operations.GetModelsAuthorSlugEndpointsArchitecture](../../models/operations/getmodelsauthorslugendpointsarchitecture.md) | :heavy_check_mark:                                                                                                         | Model architecture information                                                                                             |                                                                                                                            |
| `endpoints`                                                                                                                | [operations.Endpoint](../../models/operations/endpoint.md)[]                                                               | :heavy_check_mark:                                                                                                         | List of available endpoints for this model                                                                                 |                                                                                                                            |