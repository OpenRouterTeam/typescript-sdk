# ListModelsResponse


## Supported Types

### `operations.ListModelsResponseBody`

```typescript
const value: operations.ListModelsResponseBody = {
  data: [
    {
      id: "openai/gpt-4",
      canonicalSlug: "openai/gpt-4",
      huggingFaceId: null,
      name: "GPT-4",
      created: 1692901234,
      description:
        "GPT-4 is a large multimodal model that can solve difficult problems with greater accuracy.",
      pricing: {
        prompt: "0.00003",
        completion: "0.00006",
        request: 5717.57,
        image: 4069.73,
        imageOutput: "<value>",
        audio: "<value>",
        inputAudioCache: "<value>",
        webSearch: "<value>",
        internalReasoning: "<value>",
        inputCacheRead: 7353.06,
        inputCacheWrite: "<value>",
        discount: 5314.45,
      },
      contextLength: 8192,
      architecture: {
        tokenizer: "GPT",
        instructType: "chatml",
        modality: "text",
        inputModalities: [
          "text",
          "image",
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
        "max_tokens",
        "top_p",
        "frequency_penalty",
        "presence_penalty",
      ],
      defaultParameters: null,
    },
  ],
};
```

### `string`

```typescript
const value: string = "<value>";
```

