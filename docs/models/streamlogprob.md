# StreamLogprob

Log probability information for a token

## Example Usage

```typescript
import { StreamLogprob } from "@openrouter/sdk/models";

let value: StreamLogprob = {
  logprob: -0.5,
  token: "Hello",
};
```

## Fields

| Field                                                                    | Type                                                                     | Required                                                                 | Description                                                              |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------------ |
| `bytes`                                                                  | *number*[]                                                               | :heavy_minus_sign:                                                       | N/A                                                                      |
| `logprob`                                                                | *number*                                                                 | :heavy_check_mark:                                                       | N/A                                                                      |
| `token`                                                                  | *string*                                                                 | :heavy_check_mark:                                                       | N/A                                                                      |
| `topLogprobs`                                                            | [models.StreamLogprobTopLogprob](../models/streamlogprobtoplogprob.md)[] | :heavy_minus_sign:                                                       | N/A                                                                      |