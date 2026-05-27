# GetGenerationResponse


## Supported Types

### `models.GenerationResponse`

```typescript
const value: models.GenerationResponse = {
  data: {
    apiType: "completions",
    appId: 12345,
    cacheDiscount: null,
    cancelled: false,
    createdAt: "2024-07-15T23:33:19.433273+00:00",
    externalUser: "user-123",
    finishReason: "stop",
    generationTime: 1200,
    httpReferer: "https://openrouter.ai/",
    id: "gen-3bhGkxlo4XFrqiabUM7NDtwDzWwG",
    isByok: false,
    latency: 1250,
    model: "sao10k/l3-stheno-8b",
    moderationLatency: 50,
    nativeFinishReason: "stop",
    nativeTokensCached: 3,
    nativeTokensCompletion: 25,
    nativeTokensCompletionImages: 0,
    nativeTokensPrompt: 10,
    nativeTokensReasoning: 5,
    numFetches: 0,
    numInputAudioPrompt: 0,
    numMediaCompletion: 0,
    numMediaPrompt: 1,
    numSearchResults: 5,
    origin: "https://openrouter.ai/",
    providerName: "Infermatic",
    providerResponses: null,
    router: "openrouter/auto",
    serviceTier: "priority",
    streamed: true,
    tokensCompletion: 25,
    tokensPrompt: 10,
    totalCost: 0.0015,
    upstreamId: "chatcmpl-791bcf62-080e-4568-87d0-94c72e3b4946",
    upstreamInferenceCost: 0.0012,
    usage: 0.0015,
    userAgent: "Mozilla/5.0",
    webSearchEngine: "exa",
  },
};
```

### `models.AsyncJobStatusResponse`

```typescript
const value: models.AsyncJobStatusResponse = {
  error: null,
  id: "gen-abc123",
  jobId: "async-xyz789",
  model: "openai/gpt-4o",
  status: "in_progress",
};
```

