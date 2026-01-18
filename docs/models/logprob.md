# Logprob

## Example Usage

```typescript
import { Logprob } from "@openrouter/sdk/models";

let value: Logprob = {
  token: "<value>",
  bytes: [
    3226.37,
  ],
  logprob: 2246.86,
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