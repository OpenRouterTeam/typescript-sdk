# ChatUsageCompletionTokensDetails

Detailed completion token usage

## Example Usage

```typescript
import { ChatUsageCompletionTokensDetails } from "@openrouter/sdk/models";

let value: ChatUsageCompletionTokensDetails = {};
```

## Fields

| Field                        | Type                         | Required                     | Description                  |
| ---------------------------- | ---------------------------- | ---------------------------- | ---------------------------- |
| `acceptedPredictionTokens`   | *number*                     | :heavy_minus_sign:           | Accepted prediction tokens   |
| `audioTokens`                | *number*                     | :heavy_minus_sign:           | Tokens used for audio output |
| `reasoningTokens`            | *number*                     | :heavy_minus_sign:           | Tokens used for reasoning    |
| `rejectedPredictionTokens`   | *number*                     | :heavy_minus_sign:           | Rejected prediction tokens   |