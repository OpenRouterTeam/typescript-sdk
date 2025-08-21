# ChatCompletionTokenLogprob

Token log probability information

## Example Usage

```typescript
import { ChatCompletionTokenLogprob } from "open-router/models";

let value: ChatCompletionTokenLogprob = {
  token: "<value>",
  logprob: 4190.05,
  bytes: [
    8197.33,
  ],
  topLogprobs: [
    {
      token: "<value>",
      logprob: 9278.78,
      bytes: [
        8074.62,
        4190.25,
      ],
    },
  ],
};
```

## Fields

| Field                                          | Type                                           | Required                                       | Description                                    |
| ---------------------------------------------- | ---------------------------------------------- | ---------------------------------------------- | ---------------------------------------------- |
| `token`                                        | *string*                                       | :heavy_check_mark:                             | The token                                      |
| `logprob`                                      | *number*                                       | :heavy_check_mark:                             | Log probability of the token                   |
| `bytes`                                        | *number*[]                                     | :heavy_check_mark:                             | UTF-8 bytes of the token                       |
| `topLogprobs`                                  | [models.TopLogprob](../models/toplogprob.md)[] | :heavy_check_mark:                             | Top alternative tokens with probabilities      |