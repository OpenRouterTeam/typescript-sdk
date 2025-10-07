# ResponsesUsage

Token usage statistics for Responses API

## Example Usage

```typescript
import { ResponsesUsage } from "@openrouter/sdk/models";

let value: ResponsesUsage = {
  inputTokens: 256,
  inputTokensDetails: {
    cachedTokens: 128,
  },
  outputTokens: 128,
  outputTokensDetails: {
    reasoningTokens: 64,
  },
  totalTokens: 384,
};
```

## Fields

| Field                                                                            | Type                                                                             | Required                                                                         | Description                                                                      | Example                                                                          |
| -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `inputTokens`                                                                    | *number*                                                                         | :heavy_check_mark:                                                               | N/A                                                                              |                                                                                  |
| `inputTokensDetails`                                                             | [models.ResponsesInputTokensDetails](../models/responsesinputtokensdetails.md)   | :heavy_check_mark:                                                               | Details about input token usage                                                  | {<br/>"cached_tokens": 128<br/>}                                                 |
| `outputTokens`                                                                   | *number*                                                                         | :heavy_check_mark:                                                               | N/A                                                                              |                                                                                  |
| `outputTokensDetails`                                                            | [models.ResponsesOutputTokensDetails](../models/responsesoutputtokensdetails.md) | :heavy_check_mark:                                                               | Details about output token usage                                                 | {<br/>"reasoning_tokens": 64<br/>}                                               |
| `totalTokens`                                                                    | *number*                                                                         | :heavy_check_mark:                                                               | N/A                                                                              |                                                                                  |