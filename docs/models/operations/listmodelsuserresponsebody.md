# ListModelsUserResponseBody

Returns a list of models filtered by user provider preferences

## Example Usage

```typescript
import { ListModelsUserResponseBody } from "@openrouter/sdk/models/operations";

let value: ListModelsUserResponseBody = {
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
        prompt: "0.00003",
        completion: "0.00006",
        request: "0",
        image: "0",
        imageOutput: "<value>",
        audio: "<value>",
        inputAudioCache: 8892.26,
        webSearch: "<value>",
        internalReasoning: "<value>",
        inputCacheRead: "<value>",
        inputCacheWrite: "<value>",
        discount: 7572.39,
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
    },
  ],
};
```

## Fields

| Field                                   | Type                                    | Required                                | Description                             |
| --------------------------------------- | --------------------------------------- | --------------------------------------- | --------------------------------------- |
| `data`                                  | [models.Model](../../models/model.md)[] | :heavy_check_mark:                      | List of available models                |