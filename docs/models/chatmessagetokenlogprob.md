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
      logprob: 9715.54,
      bytes: [
        7041.35,
      ],
    },
  ],
};
```

## Fields

| Field                                                                                        | Type                                                                                         | Required                                                                                     | Description                                                                                  |
| -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `token`                                                                                      | *string*                                                                                     | :heavy_check_mark:                                                                           | N/A                                                                                          |
| `logprob`                                                                                    | *number*                                                                                     | :heavy_check_mark:                                                                           | N/A                                                                                          |
| `bytes`                                                                                      | *number*[]                                                                                   | :heavy_check_mark:                                                                           | N/A                                                                                          |
| `topLogprobs`                                                                                | [models.ChatMessageTokenLogprobTopLogprob](../models/chatmessagetokenlogprobtoplogprob.md)[] | :heavy_check_mark:                                                                           | N/A                                                                                          |