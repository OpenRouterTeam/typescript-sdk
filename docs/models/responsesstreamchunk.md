# ResponsesStreamChunk

## Example Usage

```typescript
import { ResponsesStreamChunk } from "@openrouter/sdk/models";

let value: ResponsesStreamChunk = {
  type: "response.incomplete",
  response: {
    incompleteDetails: {
      reason: "max_output_tokens",
    },
    usage: {
      inputTokens: 256,
      inputTokensDetails: {
        cachedTokens: 128,
      },
      outputTokens: 128,
      outputTokensDetails: {
        reasoningTokens: 64,
      },
      totalTokens: 384,
      cost: 4401.75,
      isByok: false,
      costDetails: {
        upstreamInferenceCost: 1509.42,
        upstreamInferenceInputCost: 6579.23,
        upstreamInferenceOutputCost: 1082.47,
      },
    },
  },
};
```

## Fields

| Field                                                                    | Type                                                                     | Required                                                                 | Description                                                              |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------------ |
| `type`                                                                   | [models.ResponsesStreamChunkType](../models/responsesstreamchunktype.md) | :heavy_check_mark:                                                       | N/A                                                                      |
| `response`                                                               | [models.Response1](../models/response1.md)                               | :heavy_check_mark:                                                       | N/A                                                                      |