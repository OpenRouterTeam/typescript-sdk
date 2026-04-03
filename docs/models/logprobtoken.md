# LogprobToken

A single token with its log probability and byte representation

## Example Usage

```typescript
import { LogprobToken } from "@openrouter/sdk/models";

let value: LogprobToken = {
  token: " Hello",
  logprob: -0.612345,
  bytes: null,
};
```

## Fields

| Field              | Type               | Required           | Description        |
| ------------------ | ------------------ | ------------------ | ------------------ |
| `token`            | *string*           | :heavy_check_mark: | N/A                |
| `logprob`          | *number*           | :heavy_check_mark: | N/A                |
| `bytes`            | *number*[]         | :heavy_check_mark: | N/A                |