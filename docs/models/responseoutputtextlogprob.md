# ResponseOutputTextLogprob

## Example Usage

```typescript
import { ResponseOutputTextLogprob } from "@openrouter/sdk/models";

let value: ResponseOutputTextLogprob = {
  token: "<value>",
  bytes: [
    6812.36,
  ],
  logprob: 1738.3,
  topLogprobs: [],
};
```

## Fields

| Field                                                                              | Type                                                                               | Required                                                                           | Description                                                                        |
| ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `token`                                                                            | *string*                                                                           | :heavy_check_mark:                                                                 | N/A                                                                                |
| `bytes`                                                                            | *number*[]                                                                         | :heavy_check_mark:                                                                 | N/A                                                                                |
| `logprob`                                                                          | *number*                                                                           | :heavy_check_mark:                                                                 | N/A                                                                                |
| `topLogprobs`                                                                      | [models.ResponseOutputTextTopLogprob](../models/responseoutputtexttoplogprob.md)[] | :heavy_check_mark:                                                                 | N/A                                                                                |