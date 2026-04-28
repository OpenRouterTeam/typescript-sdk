# Usage

Token usage information for the response

## Example Usage

```typescript
import { Usage } from "@openrouter/sdk/models";

let value: Usage = {
  inputTokens: 10,
  inputTokensDetails: {
    cachedTokens: 0,
  },
  outputTokens: 25,
  outputTokensDetails: {
    reasoningTokens: 0,
  },
  totalTokens: 35,
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
| `costDetails`                                                       | [models.UsageCostDetails](../models/usagecostdetails.md)            | :heavy_minus_sign:                                                  | N/A                                                                 |
| `isByok`                                                            | *boolean*                                                           | :heavy_minus_sign:                                                  | Whether a request was made using a Bring Your Own Key configuration |