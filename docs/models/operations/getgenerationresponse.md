# GetGenerationResponse

Generation response

## Example Usage

```typescript
import { GetGenerationResponse } from "@openrouter/sdk/models/operations";

let value: GetGenerationResponse = {
  data: {
    apiType: null,
    appId: 12345,
    cacheDiscount: 0.0002,
    cancelled: false,
    createdAt: "2024-07-15T23:33:19.433273+00:00",
    externalUser: "user-123",
    finishReason: "stop",
    generationTime: 1200,
    httpReferer: null,
    id: "gen-3bhGkxlo4XFrqiabUM7NDtwDzWwG",
    isByok: false,
    isCached: "<value>",
    latency: 1250,
    model: "sao10k/l3-stheno-8b",
    moderationLatency: 50,
    nativeFinishReason: "stop",
    nativeTokensCached: 3,
    nativeTokensCompletion: 25,
    nativeTokensCompletionImages: 0,
    nativeTokensPrompt: 10,
    nativeTokensReasoning: 5,
    numInputAudioPrompt: 0,
    numMediaCompletion: 0,
    numMediaPrompt: 1,
    numSearchResults: 5,
    origin: "https://openrouter.ai/",
    providerName: "Infermatic",
    providerResponses: [
      {
        status: 200,
      },
    ],
    router: "openrouter/auto",
    streamed: true,
    tokensCompletion: 25,
    tokensPrompt: 10,
    totalCost: 0.0015,
    upstreamId: "chatcmpl-791bcf62-080e-4568-87d0-94c72e3b4946",
    upstreamInferenceCost: 0.0012,
    usage: 0.0015,
    userAgent: "<value>",
  },
};
```

## Fields

| Field                                                                        | Type                                                                         | Required                                                                     | Description                                                                  |
| ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `data`                                                                       | [operations.GetGenerationData](../../models/operations/getgenerationdata.md) | :heavy_check_mark:                                                           | Generation data                                                              |