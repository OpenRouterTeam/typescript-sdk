# ChatMessageTokenLogprob

## Example Usage

```typescript
import { ChatMessageTokenLogprob } from "@openrouter/sdk/models";

let value: ChatMessageTokenLogprob = {
  token: "<value>",
  logprob: 8717.76,
  bytes: [],
  topLogprobs: [
    {
      token: "<value>",
      logprob: 1362.57,
      bytes: [
        7000.29,
        7450.46,
        6296.9,
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