# ChatMessageTokenLogprobs

Log probabilities for the completion

## Example Usage

```typescript
import { ChatMessageTokenLogprobs } from "@openrouter/sdk/models";

let value: ChatMessageTokenLogprobs = {
  content: [
    {
      token: " Hello",
      logprob: -0.612345,
      bytes: null,
      topLogprobs: [],
    },
  ],
};
```

## Fields

| Field                                                                    | Type                                                                     | Required                                                                 | Description                                                              |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------------ |
| `content`                                                                | [models.ChatMessageTokenLogprob](../models/chatmessagetokenlogprob.md)[] | :heavy_check_mark:                                                       | Log probabilities for content tokens                                     |
| `refusal`                                                                | [models.ChatMessageTokenLogprob](../models/chatmessagetokenlogprob.md)[] | :heavy_minus_sign:                                                       | Log probabilities for refusal tokens                                     |