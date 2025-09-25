# PostApiAlphaResponsesUsage

## Example Usage

```typescript
import { PostApiAlphaResponsesUsage } from "@openrouter/sdk/models/operations";

let value: PostApiAlphaResponsesUsage = {
  inputTokens: 1321.53,
  inputTokensDetails: {
    cachedTokens: 6223.04,
  },
  outputTokens: 6590.62,
  outputTokensDetails: {
    reasoningTokens: 5408.32,
  },
  totalTokens: 4727.47,
};
```

## Fields

| Field                                                                            | Type                                                                             | Required                                                                         | Description                                                                      |
| -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `inputTokens`                                                                    | *number*                                                                         | :heavy_check_mark:                                                               | N/A                                                                              |
| `inputTokensDetails`                                                             | [operations.InputTokensDetails](../../models/operations/inputtokensdetails.md)   | :heavy_check_mark:                                                               | N/A                                                                              |
| `outputTokens`                                                                   | *number*                                                                         | :heavy_check_mark:                                                               | N/A                                                                              |
| `outputTokensDetails`                                                            | [operations.OutputTokensDetails](../../models/operations/outputtokensdetails.md) | :heavy_check_mark:                                                               | N/A                                                                              |
| `totalTokens`                                                                    | *number*                                                                         | :heavy_check_mark:                                                               | N/A                                                                              |