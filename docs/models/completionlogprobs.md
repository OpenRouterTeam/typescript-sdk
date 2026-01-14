# CompletionLogprobs

## Example Usage

```typescript
import { CompletionLogprobs } from "@openrouter/sdk/models";

let value: CompletionLogprobs = {
  tokens: [
    "<value 1>",
    "<value 2>",
    "<value 3>",
  ],
  tokenLogprobs: [
    2988.44,
    7128.75,
    8377.63,
  ],
  topLogprobs: null,
  textOffset: [
    1144.74,
    3297.78,
  ],
};
```

## Fields

| Field                      | Type                       | Required                   | Description                |
| -------------------------- | -------------------------- | -------------------------- | -------------------------- |
| `tokens`                   | *string*[]                 | :heavy_check_mark:         | N/A                        |
| `tokenLogprobs`            | *number*[]                 | :heavy_check_mark:         | N/A                        |
| `topLogprobs`              | Record<string, *number*>[] | :heavy_check_mark:         | N/A                        |
| `textOffset`               | *number*[]                 | :heavy_check_mark:         | N/A                        |