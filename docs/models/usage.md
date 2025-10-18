# Usage

## Example Usage

```typescript
import { Usage } from "@openrouter/sdk/models";

let value: Usage = {
  inputTokens: 9797.96,
  inputTokensDetails: {
    cachedTokens: 6890.78,
  },
  outputTokens: 7874.4,
  outputTokensDetails: {
    reasoningTokens: 6012.25,
  },
  totalTokens: 8608.64,
};
```

## Fields

| Field                                                          | Type                                                           | Required                                                       | Description                                                    |
| -------------------------------------------------------------- | -------------------------------------------------------------- | -------------------------------------------------------------- | -------------------------------------------------------------- |
| `inputTokens`                                                  | *number*                                                       | :heavy_check_mark:                                             | N/A                                                            |
| `inputTokensDetails`                                           | [models.InputTokensDetails](../models/inputtokensdetails.md)   | :heavy_check_mark:                                             | N/A                                                            |
| `outputTokens`                                                 | *number*                                                       | :heavy_check_mark:                                             | N/A                                                            |
| `outputTokensDetails`                                          | [models.OutputTokensDetails](../models/outputtokensdetails.md) | :heavy_check_mark:                                             | N/A                                                            |
| `totalTokens`                                                  | *number*                                                       | :heavy_check_mark:                                             | N/A                                                            |