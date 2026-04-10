# Logprob

## Example Usage

```typescript
import { Logprob } from "@openrouter/sdk/models";

let value: Logprob = {
  bytes: [
    322637,
  ],
  logprob: 2246.86,
  token: "<value>",
  topLogprobs: [],
};
```

## Fields

| Field                                                                              | Type                                                                               | Required                                                                           | Description                                                                        |
| ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `bytes`                                                                            | *number*[]                                                                         | :heavy_check_mark:                                                                 | N/A                                                                                |
| `logprob`                                                                          | *number*                                                                           | :heavy_check_mark:                                                                 | N/A                                                                                |
| `token`                                                                            | *string*                                                                           | :heavy_check_mark:                                                                 | N/A                                                                                |
| `topLogprobs`                                                                      | [models.ResponseOutputTextTopLogprob](../models/responseoutputtexttoplogprob.md)[] | :heavy_check_mark:                                                                 | N/A                                                                                |