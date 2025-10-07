# CompletionCreateParams

## Example Usage

```typescript
import { CompletionCreateParams } from "@openrouter/sdk/models";

let value: CompletionCreateParams = {
  model: "Model Y",
  prompt: "<value>",
  bestOf: 276224,
  echo: true,
  frequencyPenalty: 1322.75,
  logitBias: {
    "key": 108.11,
    "key1": 9552.79,
  },
  logprobs: null,
  maxTokens: 775190,
  n: 622592,
  presencePenalty: null,
  seed: 672410,
  stop: [],
  stream: true,
  streamOptions: {
    includeUsage: true,
  },
  suffix: "<value>",
  temperature: 6791.47,
  topP: 7646.79,
  user: "Martin.Greenfelder",
  metadata: {
    "key": "<value>",
    "key1": "<value>",
    "key2": "<value>",
  },
  responseFormat: {
    type: "json_schema",
    jsonSchema: {
      name: "<value>",
      description: "athletic decent scuttle among excluding react",
      schema: {
        "key": "<value>",
        "key1": "<value>",
        "key2": "<value>",
      },
      strict: false,
    },
  },
};
```

## Fields

| Field                                              | Type                                               | Required                                           | Description                                        |
| -------------------------------------------------- | -------------------------------------------------- | -------------------------------------------------- | -------------------------------------------------- |
| `model`                                            | *string*                                           | :heavy_check_mark:                                 | N/A                                                |
| `prompt`                                           | *models.CompletionCreateParamsPrompt*              | :heavy_check_mark:                                 | N/A                                                |
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