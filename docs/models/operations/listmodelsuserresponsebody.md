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
      defaultParameters: {
        temperature: 5369.88,
        topP: 4063.21,
        frequencyPenalty: 2995.53,
      },
    },
  ],
};
```

## Fields

| Field                                   | Type                                    | Required                                | Description                             |
| --------------------------------------- | --------------------------------------- | --------------------------------------- | --------------------------------------- |
| `data`                                  | [models.Model](../../models/model.md)[] | :heavy_check_mark:                      | List of available models                |