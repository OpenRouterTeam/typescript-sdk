# ChatGenerationTokenUsage

## Example Usage

```typescript
import { ChatGenerationTokenUsage } from "@openrouter/sdk/models";

let value: ChatGenerationTokenUsage = {
  completionTokens: 9399.77,
  promptTokens: 9559.6,
  totalTokens: 7060.03,
  completionTokensDetails: {
    reasoningTokens: 1093.75,
    audioTokens: 130.3,
    acceptedPredictionTokens: 7308.38,
    rejectedPredictionTokens: 2801.33,
  },
  promptTokensDetails: {
    cachedTokens: 6205.53,
    audioTokens: 1522.95,
  },
};
```

## Fields

| Field                                                                  | Type                                                                   | Required                                                               | Description                                                            |
| ---------------------------------------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| `completionTokens`                                                     | *number*                                                               | :heavy_check_mark:                                                     | N/A                                                                    |
| `promptTokens`                                                         | *number*                                                               | :heavy_check_mark:                                                     | N/A                                                                    |
| `totalTokens`                                                          | *number*                                                               | :heavy_check_mark:                                                     | N/A                                                                    |
| `completionTokensDetails`                                              | [models.CompletionTokensDetails](../models/completiontokensdetails.md) | :heavy_minus_sign:                                                     | N/A                                                                    |
| `promptTokensDetails`                                                  | [models.PromptTokensDetails](../models/prompttokensdetails.md)         | :heavy_minus_sign:                                                     | N/A                                                                    |