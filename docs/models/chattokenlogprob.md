# ChatTokenLogprob

Token log probability information

## Example Usage

```typescript
import { ChatTokenLogprob } from "@openrouter/sdk/models";

let value: ChatTokenLogprob = {
  bytes: null,
  logprob: -0.612345,
  token: " Hello",
  topLogprobs: [
    {
      bytes: null,
      logprob: -0.612345,
      token: " Hello",
    },
  ],
};
```

## Fields

| Field                                                                          | Type                                                                           | Required                                                                       | Description                                                                    |
| ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ |
| `bytes`                                                                        | *number*[]                                                                     | :heavy_check_mark:                                                             | UTF-8 bytes of the token                                                       |
| `logprob`                                                                      | *number*                                                                       | :heavy_check_mark:                                                             | Log probability of the token                                                   |
| `token`                                                                        | *string*                                                                       | :heavy_check_mark:                                                             | The token                                                                      |
| `topLogprobs`                                                                  | [models.ChatTokenLogprobTopLogprob](../models/chattokenlogprobtoplogprob.md)[] | :heavy_check_mark:                                                             | Top alternative tokens with probabilities                                      |