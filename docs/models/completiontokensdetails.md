# CompletionTokensDetails

Detailed completion token usage

## Example Usage

```typescript
import { CompletionTokensDetails } from "open-router/models";

let value: CompletionTokensDetails = {};
```

## Fields

| Field                        | Type                         | Required                     | Description                  |
| ---------------------------- | ---------------------------- | ---------------------------- | ---------------------------- |
| `reasoningTokens`            | *number*                     | :heavy_minus_sign:           | Tokens used for reasoning    |
| `audioTokens`                | *number*                     | :heavy_minus_sign:           | Tokens used for audio output |
| `acceptedPredictionTokens`   | *number*                     | :heavy_minus_sign:           | Accepted prediction tokens   |
| `rejectedPredictionTokens`   | *number*                     | :heavy_minus_sign:           | Rejected prediction tokens   |