# ChatCompletionTokenLogprob

## Example Usage

```typescript
import { ChatCompletionTokenLogprob } from "openrouter/models";

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
| `token`                                        | *string*                                       | :heavy_check_mark:                             | N/A                                            |
| `logprob`                                      | *number*                                       | :heavy_check_mark:                             | N/A                                            |
| `bytes`                                        | *number*[]                                     | :heavy_check_mark:                             | N/A                                            |
| `topLogprobs`                                  | [models.TopLogprob](../models/toplogprob.md)[] | :heavy_check_mark:                             | N/A                                            |