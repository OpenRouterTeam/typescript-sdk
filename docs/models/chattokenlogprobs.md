# ChatTokenLogprobs

Log probabilities for the completion

## Example Usage

```typescript
import { ChatTokenLogprobs } from "@openrouter/sdk/models";

let value: ChatTokenLogprobs = {
  content: [
    {
      bytes: null,
      logprob: -0.612345,
      token: " Hello",
      topLogprobs: [],
    },
  ],
};
```

## Fields

| Field                                                      | Type                                                       | Required                                                   | Description                                                |
| ---------------------------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------- |
| `content`                                                  | [models.ChatTokenLogprob](../models/chattokenlogprob.md)[] | :heavy_check_mark:                                         | Log probabilities for content tokens                       |
| `refusal`                                                  | [models.ChatTokenLogprob](../models/chattokenlogprob.md)[] | :heavy_minus_sign:                                         | Log probabilities for refusal tokens                       |