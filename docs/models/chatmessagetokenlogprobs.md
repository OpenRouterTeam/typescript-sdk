# ChatMessageTokenLogprobs

## Example Usage

```typescript
import { ChatMessageTokenLogprobs } from "@openrouter/sdk/models";

let value: ChatMessageTokenLogprobs = {
  content: [
    {
      token: "<value>",
      logprob: 2764.68,
      bytes: [
        1199.17,
        6426.57,
      ],
      topLogprobs: [
        {
          token: "<value>",
          logprob: 9715.54,
          bytes: [
            7041.35,
          ],
        },
      ],
    },
  ],
  refusal: [
    {
      token: "<value>",
      logprob: 9280.35,
      bytes: [],
      topLogprobs: [],
    },
  ],
};
```

## Fields

| Field                                                                    | Type                                                                     | Required                                                                 | Description                                                              |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------------ |
| `content`                                                                | [models.ChatMessageTokenLogprob](../models/chatmessagetokenlogprob.md)[] | :heavy_check_mark:                                                       | N/A                                                                      |
| `refusal`                                                                | [models.ChatMessageTokenLogprob](../models/chatmessagetokenlogprob.md)[] | :heavy_check_mark:                                                       | N/A                                                                      |