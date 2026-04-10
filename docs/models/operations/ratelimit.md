# ~~RateLimit~~

Legacy rate limit information about a key. Will always return -1.

> :warning: **DEPRECATED**: This will be removed in a future release, please migrate away from it as soon as possible.

## Example Usage

```typescript
import { RateLimit } from "@openrouter/sdk/models/operations";

let value: RateLimit = {
  interval: "1h",
  note: "This field is deprecated and safe to ignore.",
  requests: 1000,
};
```

## Fields

| Field                                        | Type                                         | Required                                     | Description                                  | Example                                      |
| -------------------------------------------- | -------------------------------------------- | -------------------------------------------- | -------------------------------------------- | -------------------------------------------- |
| `interval`                                   | *string*                                     | :heavy_check_mark:                           | Rate limit interval                          | 1h                                           |
| `note`                                       | *string*                                     | :heavy_check_mark:                           | Note about the rate limit                    | This field is deprecated and safe to ignore. |
| `requests`                                   | *number*                                     | :heavy_check_mark:                           | Number of requests allowed per interval      | 1000                                         |