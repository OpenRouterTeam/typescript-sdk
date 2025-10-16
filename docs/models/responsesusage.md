# ResponsesUsage

Token usage information for the response

## Example Usage

```typescript
import { ResponsesUsage } from "@openrouter/sdk/models";

let value: ResponsesUsage = {
  inputTokens: 6434.62,
  inputTokensDetails: {
    cachedTokens: 6890.78,
  },
  outputTokens: 9050.65,
  outputTokensDetails: {
    reasoningTokens: 6012.25,
  },
  totalTokens: 3299.07,
  cost: 8507.77,
  isByok: true,
  costDetails: {
    upstreamInferenceCost: 9784.78,
    upstreamInferenceInputCost: 4970.36,
    upstreamInferenceOutputCost: 6210.54,
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