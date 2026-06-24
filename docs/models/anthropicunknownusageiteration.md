# AnthropicUnknownUsageIteration

## Example Usage

```typescript
import { AnthropicUnknownUsageIteration } from "@openrouter/sdk/models";

let value: AnthropicUnknownUsageIteration = {
  type: "message",
};
```

## Fields

| Field                                                                                  | Type                                                                                   | Required                                                                               | Description                                                                            | Example                                                                                |
| -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| `cacheCreation`                                                                        | [models.AnthropicIterationCacheCreation](../models/anthropiciterationcachecreation.md) | :heavy_minus_sign:                                                                     | N/A                                                                                    | {<br/>"ephemeral_1h_input_tokens": 0,<br/>"ephemeral_5m_input_tokens": 0<br/>}         |
| `cacheCreationInputTokens`                                                             | *number*                                                                               | :heavy_minus_sign:                                                                     | N/A                                                                                    |                                                                                        |
| `cacheReadInputTokens`                                                                 | *number*                                                                               | :heavy_minus_sign:                                                                     | N/A                                                                                    |                                                                                        |
| `inputTokens`                                                                          | *number*                                                                               | :heavy_minus_sign:                                                                     | N/A                                                                                    |                                                                                        |
| `outputTokens`                                                                         | *number*                                                                               | :heavy_minus_sign:                                                                     | N/A                                                                                    |                                                                                        |
| `type`                                                                                 | *string*                                                                               | :heavy_check_mark:                                                                     | N/A                                                                                    |                                                                                        |