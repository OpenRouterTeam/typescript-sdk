# ChatMessageTokenLogprobs

## Example Usage

```typescript
import { ChatMessageTokenLogprobs } from "@openrouter/sdk/models";

let value: ChatMessageTokenLogprobs = {
  content: [
    {
      token: "<value>",
      logprob: 7572.98,
      bytes: [
        9191.5,
        2986.81,
        8603.48,
      ],
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
    },
  ],
  refusal: [],
};
```

## Fields

| Field                                                                    | Type                                                                     | Required                                                                 | Description                                                              |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------------ |
| `content`                                                                | [models.ChatMessageTokenLogprob](../models/chatmessagetokenlogprob.md)[] | :heavy_check_mark:                                                       | N/A                                                                      |
| `refusal`                                                                | [models.ChatMessageTokenLogprob](../models/chatmessagetokenlogprob.md)[] | :heavy_check_mark:                                                       | N/A                                                                      |