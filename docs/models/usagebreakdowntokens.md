# UsageBreakdownTokens

Usage breakdown for token-based billing (e.g. gpt-4o-transcribe)

## Example Usage

```typescript
import { UsageBreakdownTokens } from "@openrouter/sdk/models";

let value: UsageBreakdownTokens = {
  totalTokens: 113,
  type: "tokens",
};
```

## Fields

| Field                                          | Type                                           | Required                                       | Description                                    | Example                                        |
| ---------------------------------------------- | ---------------------------------------------- | ---------------------------------------------- | ---------------------------------------------- | ---------------------------------------------- |
| `cost`                                         | *number*                                       | :heavy_minus_sign:                             | Cost attributed to token-based billing         | 0.000391                                       |
| `inputTokens`                                  | *number*                                       | :heavy_minus_sign:                             | Number of input tokens billed for this request | 83                                             |
| `outputTokens`                                 | *number*                                       | :heavy_minus_sign:                             | Number of output tokens generated              | 30                                             |
| `totalTokens`                                  | *number*                                       | :heavy_check_mark:                             | Total number of tokens used (input + output)   | 113                                            |
| `type`                                         | *"tokens"*                                     | :heavy_check_mark:                             | Breakdown billing type — token-based billing   |                                                |