# CompletionChoice

## Example Usage

```typescript
import { CompletionChoice } from "@openrouter/sdk/models";

let value: CompletionChoice = {
  text: "<value>",
  index: 7493.1,
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
  finishReason: "length",
};
```

## Fields

| Field                                                                | Type                                                                 | Required                                                             | Description                                                          |
| -------------------------------------------------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------- |
| `text`                                                               | *string*                                                             | :heavy_check_mark:                                                   | N/A                                                                  |
| `index`                                                              | *number*                                                             | :heavy_check_mark:                                                   | N/A                                                                  |
| `logprobs`                                                           | [models.CompletionLogprobs](../models/completionlogprobs.md)         | :heavy_check_mark:                                                   | N/A                                                                  |
| `finishReason`                                                       | [models.CompletionFinishReason](../models/completionfinishreason.md) | :heavy_check_mark:                                                   | N/A                                                                  |
| `nativeFinishReason`                                                 | *string*                                                             | :heavy_minus_sign:                                                   | N/A                                                                  |
| `reasoning`                                                          | *string*                                                             | :heavy_minus_sign:                                                   | N/A                                                                  |