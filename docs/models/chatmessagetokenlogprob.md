# ChatMessageTokenLogprob

Token log probability information

## Example Usage

```typescript
import { ChatMessageTokenLogprob } from "@openrouter/sdk/models";

let value: ChatMessageTokenLogprob = {
  token: " Hello",
  logprob: -0.612345,
  bytes: null,
  topLogprobs: [
    {
      token: " Hello",
      logprob: -0.612345,
      bytes: null,
    },
  ],
};
```

## Fields

| Field                                                                                        | Type                                                                                         | Required                                                                                     | Description                                                                                  |
| -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `token`                                                                                      | *string*                                                                                     | :heavy_check_mark:                                                                           | The token                                                                                    |
| `logprob`                                                                                    | *number*                                                                                     | :heavy_check_mark:                                                                           | Log probability of the token                                                                 |
| `bytes`                                                                                      | *number*[]                                                                                   | :heavy_check_mark:                                                                           | UTF-8 bytes of the token                                                                     |
| `topLogprobs`                                                                                | [models.ChatMessageTokenLogprobTopLogprob](../models/chatmessagetokenlogprobtoplogprob.md)[] | :heavy_check_mark:                                                                           | Top alternative tokens with probabilities                                                    |