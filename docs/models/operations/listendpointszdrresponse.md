# ListEndpointsZdrResponse


## Supported Types

### `operations.ListEndpointsZdrResponseBody`

```typescript
const value: operations.ListEndpointsZdrResponseBody = {
  data: [
    {
      name: "OpenAI: GPT-4",
      modelName: "GPT-4",
      contextLength: 8192,
      pricing: {
        prompt: "0.00003",
        completion: "0.00006",
        request: "0",
        image: "0",
        imageOutput: "<value>",
        audio: 199.71,
        inputAudioCache: "<value>",
        webSearch: "<value>",
        internalReasoning: 9791.42,
        inputCacheRead: 6765.93,
        inputCacheWrite: "<value>",
        discount: 7905.75,
      },
      providerName: "OpenAI",
      tag: "openai",
      quantization: "fp16",
      maxCompletionTokens: 4096,
      maxPromptTokens: 8192,
      supportedParameters: [
        "temperature",
        "top_p",
        "max_tokens",
      ],
      status: 0,
      uptimeLast30m: 99.5,
      supportsImplicitCaching: true,
    },
  ],
};
```

### `models.ErrorResponse`

```typescript
const value: models.ErrorResponse = {
  error: {
    code: 400,
    message: "Invalid request parameters",
    metadata: {
      "field": "temperature",
      "reason": "Must be between 0 and 2",
    },
  },
  userId: "user-abc123",
};
```

