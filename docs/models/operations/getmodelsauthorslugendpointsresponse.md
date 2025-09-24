# GetModelsAuthorSlugEndpointsResponse

Returns a list of endpoints

## Example Usage

```typescript
import { GetModelsAuthorSlugEndpointsResponse } from "@openrouter/sdk/models/operations";

let value: GetModelsAuthorSlugEndpointsResponse = {
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
    endpoints: [],
  },
};
```

## Fields

| Field                                                                                                      | Type                                                                                                       | Required                                                                                                   | Description                                                                                                |
| ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `data`                                                                                                     | [operations.GetModelsAuthorSlugEndpointsData](../../models/operations/getmodelsauthorslugendpointsdata.md) | :heavy_check_mark:                                                                                         | N/A                                                                                                        |