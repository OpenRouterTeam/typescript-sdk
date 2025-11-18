# CreateEmbeddingsRequest

## Example Usage

```typescript
import { CreateEmbeddingsRequest } from "@openrouter/sdk/models/operations";

let value: CreateEmbeddingsRequest = {
  input: [
    [],
    [
      3849.69,
    ],
    [],
  ],
  model: "Model Y",
};
```

## Fields

| Field                                                                                      | Type                                                                                       | Required                                                                                   | Description                                                                                |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| `input`                                                                                    | *operations.InputUnion*                                                                    | :heavy_check_mark:                                                                         | N/A                                                                                        |
| `model`                                                                                    | *string*                                                                                   | :heavy_check_mark:                                                                         | N/A                                                                                        |
| `encodingFormat`                                                                           | [operations.EncodingFormat](../../models/operations/encodingformat.md)                     | :heavy_minus_sign:                                                                         | N/A                                                                                        |
| `dimensions`                                                                               | *number*                                                                                   | :heavy_minus_sign:                                                                         | N/A                                                                                        |
| `user`                                                                                     | *string*                                                                                   | :heavy_minus_sign:                                                                         | N/A                                                                                        |
| `provider`                                                                                 | [operations.CreateEmbeddingsProvider](../../models/operations/createembeddingsprovider.md) | :heavy_minus_sign:                                                                         | N/A                                                                                        |
| `inputType`                                                                                | *string*                                                                                   | :heavy_minus_sign:                                                                         | N/A                                                                                        |