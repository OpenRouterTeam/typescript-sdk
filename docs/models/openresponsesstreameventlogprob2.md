# OpenResponsesStreamEventLogprob2

Log probability information for a token

## Example Usage

```typescript
import { OpenResponsesStreamEventLogprob2 } from "@openrouter/sdk/models";

let value: OpenResponsesStreamEventLogprob2 = {
  logprob: -0.1,
  token: "world",
};
```

## Fields

| Field                                                                                            | Type                                                                                             | Required                                                                                         | Description                                                                                      |
| ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| `logprob`                                                                                        | *number*                                                                                         | :heavy_check_mark:                                                                               | N/A                                                                                              |
| `token`                                                                                          | *string*                                                                                         | :heavy_check_mark:                                                                               | N/A                                                                                              |
| `topLogprobs`                                                                                    | [models.OpenResponsesStreamEventTopLogprob2](../models/openresponsesstreameventtoplogprob2.md)[] | :heavy_minus_sign:                                                                               | N/A                                                                                              |
| `bytes`                                                                                          | *number*[]                                                                                       | :heavy_minus_sign:                                                                               | N/A                                                                                              |