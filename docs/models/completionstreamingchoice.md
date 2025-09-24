# CompletionStreamingChoice

## Example Usage

```typescript
import { CompletionStreamingChoice } from "@openrouter/sdk/models";

let value: CompletionStreamingChoice = {
  text: "<value>",
  index: 1441.83,
  logprobs: {
    tokens: [
      "<value 1>",
    ],
    tokenLogprobs: [
      7640.5,
      1771.28,
    ],
    topLogprobs: [],
    textOffset: [
      3937.38,
      9605.77,
    ],
  },
  finishReason: "content_filter",
};
```

## Fields

| Field                                                                | Type                                                                 | Required                                                             | Description                                                          |
| -------------------------------------------------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------- |
| `text`                                                               | *string*                                                             | :heavy_check_mark:                                                   | N/A                                                                  |
| `index`                                                              | *number*                                                             | :heavy_check_mark:                                                   | N/A                                                                  |
| `logprobs`                                                           | [models.CompletionLogprobs](../models/completionlogprobs.md)         | :heavy_check_mark:                                                   | N/A                                                                  |
| `finishReason`                                                       | [models.CompletionFinishReason](../models/completionfinishreason.md) | :heavy_check_mark:                                                   | N/A                                                                  |