# Response1

## Example Usage

```typescript
import { Response1 } from "@openrouter/sdk/models";

let value: Response1 = {
  incompleteDetails: {
    reason: "max_output_tokens",
  },
  usage: {
    inputTokens: 256,
    inputTokensDetails: {
      cachedTokens: 128,
    },
    outputTokens: 128,
    outputTokensDetails: {
      reasoningTokens: 64,
    },
    totalTokens: 384,
  },
};
```

## Fields

| Field                                                                                                                                                                     | Type                                                                                                                                                                      | Required                                                                                                                                                                  | Description                                                                                                                                                               | Example                                                                                                                                                                   |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `incompleteDetails`                                                                                                                                                       | [models.IncompleteDetails](../models/incompletedetails.md)                                                                                                                | :heavy_check_mark:                                                                                                                                                        | N/A                                                                                                                                                                       | {<br/>"reason": "max_output_tokens"<br/>}                                                                                                                                 |
| `usage`                                                                                                                                                                   | [models.ResponsesUsage](../models/responsesusage.md)                                                                                                                      | :heavy_check_mark:                                                                                                                                                        | Token usage statistics for Responses API                                                                                                                                  | {<br/>"input_tokens": 256,<br/>"input_tokens_details": {<br/>"cached_tokens": 128<br/>},<br/>"output_tokens": 128,<br/>"output_tokens_details": {<br/>"reasoning_tokens": 64<br/>},<br/>"total_tokens": 384<br/>} |