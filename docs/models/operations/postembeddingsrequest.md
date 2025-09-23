# PostEmbeddingsRequest

## Example Usage

```typescript
import { PostEmbeddingsRequest } from "@openrouter/sdk/models/operations";

let value: PostEmbeddingsRequest = {
  input: [
    6441.94,
    3210.32,
  ],
  provider: {
    zdr: true,
  },
};
```

## Fields

| Field                                                                                  | Type                                                                                   | Required                                                                               | Description                                                                            |
| -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| `input`                                                                                | *operations.Input*                                                                     | :heavy_check_mark:                                                                     | N/A                                                                                    |
| `model`                                                                                | *string*                                                                               | :heavy_minus_sign:                                                                     | N/A                                                                                    |
| `models`                                                                               | *string*[]                                                                             | :heavy_minus_sign:                                                                     | N/A                                                                                    |
| `provider`                                                                             | [operations.PostEmbeddingsProvider](../../models/operations/postembeddingsprovider.md) | :heavy_minus_sign:                                                                     | N/A                                                                                    |
| `encodingFormat`                                                                       | *operations.EncodingFormat*                                                            | :heavy_minus_sign:                                                                     | N/A                                                                                    |
| `user`                                                                                 | *string*                                                                               | :heavy_minus_sign:                                                                     | N/A                                                                                    |