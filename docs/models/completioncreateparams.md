# CompletionCreateParams

## Example Usage

```typescript
import { CompletionCreateParams } from "@openrouter/sdk/models";

let value: CompletionCreateParams = {
  model: "Model Y",
  prompt: "<value>",
};
```

## Fields

| Field                                              | Type                                               | Required                                           | Description                                        |
| -------------------------------------------------- | -------------------------------------------------- | -------------------------------------------------- | -------------------------------------------------- |
| `model`                                            | *string*                                           | :heavy_check_mark:                                 | N/A                                                |
| `prompt`                                           | *models.Prompt*                                    | :heavy_check_mark:                                 | N/A                                                |
| `bestOf`                                           | *number*                                           | :heavy_minus_sign:                                 | N/A                                                |
| `echo`                                             | *boolean*                                          | :heavy_minus_sign:                                 | N/A                                                |
| `frequencyPenalty`                                 | *number*                                           | :heavy_minus_sign:                                 | N/A                                                |
| `logitBias`                                        | Record<string, *number*>                           | :heavy_minus_sign:                                 | N/A                                                |
| `logprobs`                                         | *number*                                           | :heavy_minus_sign:                                 | N/A                                                |
| `maxTokens`                                        | *number*                                           | :heavy_minus_sign:                                 | N/A                                                |
| `n`                                                | *number*                                           | :heavy_minus_sign:                                 | N/A                                                |
| `presencePenalty`                                  | *number*                                           | :heavy_minus_sign:                                 | N/A                                                |
| `seed`                                             | *number*                                           | :heavy_minus_sign:                                 | N/A                                                |
| `stop`                                             | *models.CompletionCreateParamsStop*                | :heavy_minus_sign:                                 | N/A                                                |
| `stream`                                           | *boolean*                                          | :heavy_minus_sign:                                 | N/A                                                |
| `streamOptions`                                    | [models.StreamOptions](../models/streamoptions.md) | :heavy_minus_sign:                                 | N/A                                                |
| `suffix`                                           | *string*                                           | :heavy_minus_sign:                                 | N/A                                                |
| `temperature`                                      | *number*                                           | :heavy_minus_sign:                                 | N/A                                                |
| `topP`                                             | *number*                                           | :heavy_minus_sign:                                 | N/A                                                |
| `user`                                             | *string*                                           | :heavy_minus_sign:                                 | N/A                                                |
| `metadata`                                         | Record<string, *string*>                           | :heavy_minus_sign:                                 | N/A                                                |
| `responseFormat`                                   | *models.CompletionCreateParamsResponseFormatUnion* | :heavy_minus_sign:                                 | N/A                                                |