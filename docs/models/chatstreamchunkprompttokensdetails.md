# ChatStreamChunkPromptTokensDetails

Detailed prompt token usage

## Example Usage

```typescript
import { ChatStreamChunkPromptTokensDetails } from "@openrouter/sdk/models";

let value: ChatStreamChunkPromptTokensDetails = {};
```

## Fields

| Field                                                                                            | Type                                                                                             | Required                                                                                         | Description                                                                                      |
| ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| `cachedTokens`                                                                                   | *number*                                                                                         | :heavy_minus_sign:                                                                               | Cached prompt tokens                                                                             |
| `cacheWriteTokens`                                                                               | *number*                                                                                         | :heavy_minus_sign:                                                                               | Tokens written to cache. Only returned for models with explicit caching and cache write pricing. |
| `audioTokens`                                                                                    | *number*                                                                                         | :heavy_minus_sign:                                                                               | Audio input tokens                                                                               |
| `videoTokens`                                                                                    | *number*                                                                                         | :heavy_minus_sign:                                                                               | Video input tokens                                                                               |