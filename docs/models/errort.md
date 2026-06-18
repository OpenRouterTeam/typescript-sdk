# ErrorT

Error information

## Example Usage

```typescript
import { ErrorT } from "@openrouter/sdk/models";

let value: ErrorT = {
  code: 429,
  message: "Rate limit exceeded",
};
```

## Fields

| Field                                                                  | Type                                                                   | Required                                                               | Description                                                            | Example                                                                |
| ---------------------------------------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| `code`                                                                 | *number*                                                               | :heavy_check_mark:                                                     | Error code                                                             | 429                                                                    |
| `message`                                                              | *string*                                                               | :heavy_check_mark:                                                     | Error message                                                          | Rate limit exceeded                                                    |
| `metadata`                                                             | [models.ChatStreamChunkMetadata](../models/chatstreamchunkmetadata.md) | :heavy_minus_sign:                                                     | Structured error metadata                                              |                                                                        |