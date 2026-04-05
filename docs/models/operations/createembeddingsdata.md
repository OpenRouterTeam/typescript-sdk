# CreateEmbeddingsData

A single embedding object

## Example Usage

```typescript
import { CreateEmbeddingsData } from "@openrouter/sdk/models/operations";

let value: CreateEmbeddingsData = {
  object: "embedding",
  embedding: [
    0.0023064255,
    -0.009327292,
    0.015797347,
  ],
};
```

## Fields

| Field                                                                    | Type                                                                     | Required                                                                 | Description                                                              | Example                                                                  |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------------ |
| `object`                                                                 | [operations.ObjectEmbedding](../../models/operations/objectembedding.md) | :heavy_check_mark:                                                       | N/A                                                                      |                                                                          |
| `embedding`                                                              | *operations.Embedding*                                                   | :heavy_check_mark:                                                       | Embedding vector as an array of floats or a base64 string                | [<br/>0.0023064255,<br/>-0.009327292,<br/>0.015797347<br/>]              |
| `index`                                                                  | *number*                                                                 | :heavy_minus_sign:                                                       | Index of the embedding in the input list                                 | 0                                                                        |