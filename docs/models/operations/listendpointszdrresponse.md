# ListEndpointsZdrResponse


## Supported Types

### `operations.ListEndpointsZdrResponseBody`

```typescript
const value: operations.ListEndpointsZdrResponseBody = {
  data: [
    {
      name: "<value>",
      modelName: "<value>",
      contextLength: 822.84,
      pricing: {
        prompt: "<value>",
        completion: "<value>",
        request: 4487.12,
        image: 7285.01,
        imageOutput: 7293.72,
        audio: "<value>",
        inputAudioCache: "<value>",
        webSearch: 8364.54,
        internalReasoning: "<value>",
        inputCacheRead: "<value>",
        inputCacheWrite: "<value>",
        discount: 8394.77,
      },
      providerName: "Cent-ML",
      tag: "<value>",
      quantization: "fp8",
      maxCompletionTokens: 9791.42,
      maxPromptTokens: 6765.93,
      supportedParameters: [
        "parallel_tool_calls",
      ],
      status: -3,
      uptimeLast30m: 3286.44,
      supportsImplicitCaching: false,
    },
  ],
};
```

### `models.ErrorResponse`

```typescript
const value: models.ErrorResponse = {
  error: {
    code: 451,
    message: "<value>",
    metadata: {
      "key": "<value>",
    },
  },
  userId: "<id>",
};
```

