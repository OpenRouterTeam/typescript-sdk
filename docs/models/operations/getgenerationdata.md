# GetGenerationData

Generation data

## Example Usage

```typescript
import { GetGenerationData } from "@openrouter/sdk/models/operations";

let value: GetGenerationData = {
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
  numInputAudioPrompt: 0,
  numVideoPrompt: 0,
  numMediaCompletion: 0,
  numSearchResults: 5,
  origin: "https://openrouter.ai/",
  usage: 0.0015,
  isByok: false,
  nativeFinishReason: "stop",
  externalUser: "user-123",
  apiType: "completions",
};
```

## Fields

| Field                                                    | Type                                                     | Required                                                 | Description                                              | Example                                                  |
| -------------------------------------------------------- | -------------------------------------------------------- | -------------------------------------------------------- | -------------------------------------------------------- | -------------------------------------------------------- |
| `id`                                                     | *string*                                                 | :heavy_check_mark:                                       | Unique identifier for the generation                     | gen-3bhGkxlo4XFrqiabUM7NDtwDzWwG                         |
| `upstreamId`                                             | *string*                                                 | :heavy_check_mark:                                       | Upstream provider's identifier for this generation       | chatcmpl-791bcf62-080e-4568-87d0-94c72e3b4946            |
| `totalCost`                                              | *number*                                                 | :heavy_check_mark:                                       | Total cost of the generation in USD                      | 0.0015                                                   |
| `cacheDiscount`                                          | *number*                                                 | :heavy_check_mark:                                       | Discount applied due to caching                          | 0.0002                                                   |
| `upstreamInferenceCost`                                  | *number*                                                 | :heavy_check_mark:                                       | Cost charged by the upstream provider                    | 0.0012                                                   |
| `createdAt`                                              | *string*                                                 | :heavy_check_mark:                                       | ISO 8601 timestamp of when the generation was created    | 2024-07-15T23:33:19.433273+00:00                         |
| `model`                                                  | *string*                                                 | :heavy_check_mark:                                       | Model used for the generation                            | sao10k/l3-stheno-8b                                      |
| `appId`                                                  | *number*                                                 | :heavy_check_mark:                                       | ID of the app that made the request                      | 12345                                                    |
| `streamed`                                               | *boolean*                                                | :heavy_check_mark:                                       | Whether the response was streamed                        | true                                                     |
| `cancelled`                                              | *boolean*                                                | :heavy_check_mark:                                       | Whether the generation was cancelled                     | false                                                    |
| `providerName`                                           | *string*                                                 | :heavy_check_mark:                                       | Name of the provider that served the request             | Infermatic                                               |
| `latency`                                                | *number*                                                 | :heavy_check_mark:                                       | Total latency in milliseconds                            | 1250                                                     |
| `moderationLatency`                                      | *number*                                                 | :heavy_check_mark:                                       | Moderation latency in milliseconds                       | 50                                                       |
| `generationTime`                                         | *number*                                                 | :heavy_check_mark:                                       | Time taken for generation in milliseconds                | 1200                                                     |
| `finishReason`                                           | *string*                                                 | :heavy_check_mark:                                       | Reason the generation finished                           | stop                                                     |
| `tokensPrompt`                                           | *number*                                                 | :heavy_check_mark:                                       | Number of tokens in the prompt                           | 10                                                       |
| `tokensCompletion`                                       | *number*                                                 | :heavy_check_mark:                                       | Number of tokens in the completion                       | 25                                                       |
| `nativeTokensPrompt`                                     | *number*                                                 | :heavy_check_mark:                                       | Native prompt tokens as reported by provider             | 10                                                       |
| `nativeTokensCompletion`                                 | *number*                                                 | :heavy_check_mark:                                       | Native completion tokens as reported by provider         | 25                                                       |
| `nativeTokensCompletionImages`                           | *number*                                                 | :heavy_check_mark:                                       | Native completion image tokens as reported by provider   | 0                                                        |
| `nativeTokensReasoning`                                  | *number*                                                 | :heavy_check_mark:                                       | Native reasoning tokens as reported by provider          | 5                                                        |
| `nativeTokensCached`                                     | *number*                                                 | :heavy_check_mark:                                       | Native cached tokens as reported by provider             | 3                                                        |
| `numMediaPrompt`                                         | *number*                                                 | :heavy_check_mark:                                       | Number of media items in the prompt                      | 1                                                        |
| `numInputAudioPrompt`                                    | *number*                                                 | :heavy_check_mark:                                       | Number of audio inputs in the prompt                     | 0                                                        |
| `numVideoPrompt`                                         | *number*                                                 | :heavy_check_mark:                                       | Number of video inputs in the prompt                     | 0                                                        |
| `numMediaCompletion`                                     | *number*                                                 | :heavy_check_mark:                                       | Number of media items in the completion                  | 0                                                        |
| `numSearchResults`                                       | *number*                                                 | :heavy_check_mark:                                       | Number of search results included                        | 5                                                        |
| `origin`                                                 | *string*                                                 | :heavy_check_mark:                                       | Origin URL of the request                                | https://openrouter.ai/                                   |
| `usage`                                                  | *number*                                                 | :heavy_check_mark:                                       | Usage amount in USD                                      | 0.0015                                                   |
| `isByok`                                                 | *boolean*                                                | :heavy_check_mark:                                       | Whether this used bring-your-own-key                     | false                                                    |
| `nativeFinishReason`                                     | *string*                                                 | :heavy_check_mark:                                       | Native finish reason as reported by provider             | stop                                                     |
| `externalUser`                                           | *string*                                                 | :heavy_check_mark:                                       | External user identifier                                 | user-123                                                 |
| `apiType`                                                | [operations.ApiType](../../models/operations/apitype.md) | :heavy_check_mark:                                       | Type of API used for the generation                      |                                                          |