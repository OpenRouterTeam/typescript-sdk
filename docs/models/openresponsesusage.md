# OpenResponsesUsage

Token usage information for the response

## Example Usage

```typescript
import { OpenResponsesUsage } from "@openrouter/sdk/models";

let value: OpenResponsesUsage = {
  inputTokens: 10,
  inputTokensDetails: {
    cachedTokens: 0,
  },
  outputTokens: 25,
  outputTokensDetails: {
    reasoningTokens: 0,
  },
  totalTokens: 35,
  cost: 0.0012,
  isByok: false,
  costDetails: {
    upstreamInferenceCost: null,
    upstreamInferenceInputCost: 0.0008,
    upstreamInferenceOutputCost: 0.0004,
  },
};
```

## Fields

| Field                                                               | Type                                                                | Required                                                            | Description                                                         |
| ------------------------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------- |
| `inputTokens`                                                       | *number*                                                            | :heavy_check_mark:                                                  | N/A                                                                 |
| `inputTokensDetails`                                                | [models.InputTokensDetails](../models/inputtokensdetails.md)        | :heavy_check_mark:                                                  | N/A                                                                 |
| `outputTokens`                                                      | *number*                                                            | :heavy_check_mark:                                                  | N/A                                                                 |
| `outputTokensDetails`                                               | [models.OutputTokensDetails](../models/outputtokensdetails.md)      | :heavy_check_mark:                                                  | N/A                                                                 |
| `totalTokens`                                                       | *number*                                                            | :heavy_check_mark:                                                  | N/A                                                                 |
| `cost`                                                              | *number*                                                            | :heavy_minus_sign:                                                  | Cost of the completion                                              |
| `isByok`                                                            | *boolean*                                                           | :heavy_minus_sign:                                                  | Whether a request was made using a Bring Your Own Key configuration |
| `costDetails`                                                       | [models.CostDetails](../models/costdetails.md)                      | :heavy_minus_sign:                                                  | N/A                                                                 |