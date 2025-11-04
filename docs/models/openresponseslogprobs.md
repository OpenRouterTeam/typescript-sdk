# OpenResponsesLogProbs

Log probability information for a token

## Example Usage

```typescript
import { OpenResponsesLogProbs } from "@openrouter/sdk/models";

let value: OpenResponsesLogProbs = {
  logprob: -0.1,
  token: "world",
};
```

## Fields

| Field                                                                      | Type                                                                       | Required                                                                   | Description                                                                |
| -------------------------------------------------------------------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| `logprob`                                                                  | *number*                                                                   | :heavy_check_mark:                                                         | N/A                                                                        |
| `token`                                                                    | *string*                                                                   | :heavy_check_mark:                                                         | N/A                                                                        |
| `topLogprobs`                                                              | [models.OpenResponsesTopLogprobs](../models/openresponsestoplogprobs.md)[] | :heavy_minus_sign:                                                         | N/A                                                                        |