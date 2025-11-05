# CreateEmbeddingsRequest

## Example Usage

```typescript
import { CreateEmbeddingsRequest } from "@openrouter/sdk/models/operations";

let value: CreateEmbeddingsRequest = {
  input: [
    669.24,
    4968.43,
    3849.69,
  ],
  model: "Altima",
};
```

## Fields

| Field                                                                                      | Type                                                                                       | Required                                                                                   | Description                                                                                |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| `input`                                                                                    | *operations.Input*                                                                         | :heavy_check_mark:                                                                         | N/A                                                                                        |
| `model`                                                                                    | *string*                                                                                   | :heavy_check_mark:                                                                         | N/A                                                                                        |
| `provider`                                                                                 | [operations.CreateEmbeddingsProvider](../../models/operations/createembeddingsprovider.md) | :heavy_minus_sign:                                                                         | N/A                                                                                        |
| `encodingFormat`                                                                           | *operations.EncodingFormat*                                                                | :heavy_minus_sign:                                                                         | N/A                                                                                        |
| `user`                                                                                     | *string*                                                                                   | :heavy_minus_sign:                                                                         | N/A                                                                                        |