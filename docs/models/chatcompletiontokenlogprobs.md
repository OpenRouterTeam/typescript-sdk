# ChatCompletionTokenLogprobs

## Example Usage

```typescript
import { ChatCompletionTokenLogprobs } from "open-router/models";

let value: ChatCompletionTokenLogprobs = {
  content: null,
  refusal: [
    {
      token: "<value>",
      logprob: 3926.44,
      bytes: [],
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
    },
  ],
};
```

## Fields

| Field                                                                          | Type                                                                           | Required                                                                       | Description                                                                    |
| ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ |
| `content`                                                                      | [models.ChatCompletionTokenLogprob](../models/chatcompletiontokenlogprob.md)[] | :heavy_check_mark:                                                             | N/A                                                                            |
| `refusal`                                                                      | [models.ChatCompletionTokenLogprob](../models/chatcompletiontokenlogprob.md)[] | :heavy_check_mark:                                                             | N/A                                                                            |