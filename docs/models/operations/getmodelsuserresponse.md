# GetModelsUserResponse

Returns a list of models filtered by user provider preferences

## Example Usage

```typescript
import { GetModelsUserResponse } from "@openrouter/sdk/models/operations";

let value: GetModelsUserResponse = {
  data: [
    {
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
    },
  ],
};
```

## Fields

| Field                                                                          | Type                                                                           | Required                                                                       | Description                                                                    |
| ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ |
| `data`                                                                         | [operations.GetModelsUserData](../../models/operations/getmodelsuserdata.md)[] | :heavy_check_mark:                                                             | List of available models                                                       |