# GetGenerationResponseBody

Returns the request metadata for this generation

## Example Usage

```typescript
import { GetGenerationResponseBody } from "open-router/models/operations";

let value: GetGenerationResponseBody = {
  data: {
    id: "gen-3bhGkxlo4XFrqiabUM7NDtwDzWwG",
    upstreamId: "chatcmpl-791bcf62-080e-4568-87d0-94c72e3b4946",
    totalCost: 0.0015,
    cacheDiscount: 0.0002,
    upstreamInferenceCost: 0.0012,
    createdAt: "2024-07-15T23:33:19.433273+00:00",
    model: "sao10k/l3-stheno-8b",
    appId: 12345,
    streamed: true,
    cancelled: false,
    providerName: "Infermatic",
    latency: 1250,
    moderationLatency: 50,
    generationTime: 1200,
    finishReason: "stop",
    tokensPrompt: 10,
    tokensCompletion: 25,
    nativeTokensPrompt: 10,
    nativeTokensCompletion: 25,
    nativeTokensCompletionImages: 0,
    nativeTokensReasoning: 5,
    nativeTokensCached: 3,
    numMediaPrompt: 1,
    numMediaCompletion: 0,
    numSearchResults: 5,
    origin: "https://openrouter.ai/",
    usage: 0.0015,
    isByok: false,
    nativeFinishReason: "stop",
    externalUser: "user-123",
    apiType: "embeddings",
  },
};
```

## Fields

| Field                                                                        | Type                                                                         | Required                                                                     | Description                                                                  |
| ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `data`                                                                       | [operations.GetGenerationData](../../models/operations/getgenerationdata.md) | :heavy_check_mark:                                                           | Generation data                                                              |