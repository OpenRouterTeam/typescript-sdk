# ModelsListResponse

List of available models

## Example Usage

```typescript
import { ModelsListResponse } from "@openrouter/sdk/models";

let value: ModelsListResponse = {
  data: [
    {
      id: "openai/gpt-4",
      canonicalSlug: "openai/gpt-4",
      name: "GPT-4",
      created: 1692901234,
      pricing: {
        prompt: 0.00003,
        completion: 0.00006,
      },
      contextLength: 8192,
      architecture: {
        modality: "text->text",
        inputModalities: [
          "text",
        ],
        outputModalities: [
          "text",
        ],
      },
      topProvider: {
        isModerated: true,
      },
      perRequestLimits: null,
      supportedParameters: [
        "temperature",
        "top_p",
        "max_tokens",
        "frequency_penalty",
        "presence_penalty",
      ],
      defaultParameters: null,
    },
  ],
};
```

## Fields

| Field                                | Type                                 | Required                             | Description                          |
| ------------------------------------ | ------------------------------------ | ------------------------------------ | ------------------------------------ |
| `data`                               | [models.Model](../models/model.md)[] | :heavy_check_mark:                   | List of available models             |