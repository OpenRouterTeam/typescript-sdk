# CompletionUsage

## Example Usage

```typescript
import { CompletionUsage } from "open-router/models";

let value: CompletionUsage = {
  completionTokens: 3945.12,
  promptTokens: 7037.32,
  totalTokens: 1194.53,
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