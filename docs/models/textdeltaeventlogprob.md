# TextDeltaEventLogprob

Log probability information for a token

## Example Usage

```typescript
import { TextDeltaEventLogprob } from "@openrouter/sdk/models";

let value: TextDeltaEventLogprob = {
  logprob: -0.1,
  token: "world",
};
```

## Fields

| Field                                                                      | Type                                                                       | Required                                                                   | Description                                                                |
| -------------------------------------------------------------------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| `logprob`                                                                  | *number*                                                                   | :heavy_check_mark:                                                         | N/A                                                                        |
| `token`                                                                    | *string*                                                                   | :heavy_check_mark:                                                         | N/A                                                                        |
| `topLogprobs`                                                              | [models.TextDeltaEventTopLogprob](../models/textdeltaeventtoplogprob.md)[] | :heavy_minus_sign:                                                         | N/A                                                                        |
| `bytes`                                                                    | *number*[]                                                                 | :heavy_minus_sign:                                                         | N/A                                                                        |