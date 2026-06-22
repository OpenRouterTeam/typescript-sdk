# ImageGenerationUsagePromptTokensDetails

Breakdown of tokens used in the prompt.

## Example Usage

```typescript
import { ImageGenerationUsagePromptTokensDetails } from "@openrouter/sdk/models";

let value: ImageGenerationUsagePromptTokensDetails = {};
```

## Fields

| Field                                                                                            | Type                                                                                             | Required                                                                                         | Description                                                                                      |
| ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| `audioTokens`                                                                                    | *number*                                                                                         | :heavy_minus_sign:                                                                               | Tokens used for input audio.                                                                     |
| `cacheWriteTokens`                                                                               | *number*                                                                                         | :heavy_minus_sign:                                                                               | Tokens written to cache. Only returned for models with explicit caching and cache write pricing. |
| `cachedTokens`                                                                                   | *number*                                                                                         | :heavy_minus_sign:                                                                               | Tokens cached by the endpoint.                                                                   |
| `fileTokens`                                                                                     | *number*                                                                                         | :heavy_minus_sign:                                                                               | Tokens used for input files/documents.                                                           |
| `videoTokens`                                                                                    | *number*                                                                                         | :heavy_minus_sign:                                                                               | Tokens used for input video.                                                                     |