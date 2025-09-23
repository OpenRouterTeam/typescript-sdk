# PostEmbeddingsData

## Example Usage

```typescript
import { PostEmbeddingsData } from "openrouter/models/operations";

let value: PostEmbeddingsData = {
  object: "embedding",
  embedding: [
    7676.4,
    4540.76,
    882.45,
  ],
  index: 3585.29,
};
```

## Fields

| Field                                                                    | Type                                                                     | Required                                                                 | Description                                                              |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------------ |
| `object`                                                                 | [operations.ObjectEmbedding](../../models/operations/objectembedding.md) | :heavy_check_mark:                                                       | N/A                                                                      |
| `embedding`                                                              | *number*[]                                                               | :heavy_check_mark:                                                       | N/A                                                                      |
| `index`                                                                  | *number*                                                                 | :heavy_check_mark:                                                       | N/A                                                                      |