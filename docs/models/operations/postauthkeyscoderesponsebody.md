# PostAuthKeysCodeResponseBody

Successfully created authorization code

## Example Usage

```typescript
import { PostAuthKeysCodeResponseBody } from "@openrouter/sdk/models/operations";

let value: PostAuthKeysCodeResponseBody = {
  data: {
    id: "auth_code_xyz789",
    appId: 12345,
    createdAt: "2025-08-24T10:30:00Z",
  },
};
```

## Fields

| Field                                                                              | Type                                                                               | Required                                                                           | Description                                                                        |
| ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `data`                                                                             | [operations.PostAuthKeysCodeData](../../models/operations/postauthkeyscodedata.md) | :heavy_check_mark:                                                                 | N/A                                                                                |