# CompletionTokensDetails

Detailed completion token usage

## Example Usage

```typescript
import { CompletionTokensDetails } from "@openrouter/sdk/models";

let value: CompletionTokensDetails = {};
```

## Fields

| Field                        | Type                         | Required                     | Description                  |
| ---------------------------- | ---------------------------- | ---------------------------- | ---------------------------- |
| `acceptedPredictionTokens`   | *number*                     | :heavy_minus_sign:           | Accepted prediction tokens   |
| `audioTokens`                | *number*                     | :heavy_minus_sign:           | Tokens used for audio output |
| `reasoningTokens`            | *number*                     | :heavy_minus_sign:           | Tokens used for reasoning    |
| `rejectedPredictionTokens`   | *number*                     | :heavy_minus_sign:           | Rejected prediction tokens   |