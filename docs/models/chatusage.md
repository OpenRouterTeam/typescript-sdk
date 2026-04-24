# ChatUsage

Token usage statistics

## Example Usage

```typescript
import { ChatUsage } from "@openrouter/sdk/models";

let value: ChatUsage = {
  completionTokens: 15,
  promptTokens: 10,
  totalTokens: 25,
};
```

## Fields

| Field                                                                  | Type                                                                   | Required                                                               | Description                                                            |
| ---------------------------------------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| `completionTokens`                                                     | *number*                                                               | :heavy_check_mark:                                                     | Number of tokens in the completion                                     |
| `completionTokensDetails`                                              | [models.CompletionTokensDetails](../models/completiontokensdetails.md) | :heavy_minus_sign:                                                     | Detailed completion token usage                                        |
| `cost`                                                                 | *number*                                                               | :heavy_minus_sign:                                                     | Cost of the completion                                                 |
| `costDetails`                                                          | [models.ChatUsageCostDetails](../models/chatusagecostdetails.md)       | :heavy_minus_sign:                                                     | Breakdown of upstream inference costs                                  |
| `isByok`                                                               | *boolean*                                                              | :heavy_minus_sign:                                                     | Whether a request was made using a Bring Your Own Key configuration    |
| `promptTokens`                                                         | *number*                                                               | :heavy_check_mark:                                                     | Number of tokens in the prompt                                         |
| `promptTokensDetails`                                                  | [models.PromptTokensDetails](../models/prompttokensdetails.md)         | :heavy_minus_sign:                                                     | Detailed prompt token usage                                            |
| `totalTokens`                                                          | *number*                                                               | :heavy_check_mark:                                                     | Total number of tokens                                                 |