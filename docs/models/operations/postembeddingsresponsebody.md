# PostEmbeddingsResponseBody

Embedding response

## Example Usage

```typescript
import { PostEmbeddingsResponseBody } from "open-router/models/operations";

let value: PostEmbeddingsResponseBody = {
  object: "list",
  data: [
    {
      object: "embedding",
      embedding: [
        5753.03,
        2255.62,
        3982.28,
      ],
      index: 9702.93,
    },
  ],
  model: "CTS",
};
```

## Fields

| Field                                                                            | Type                                                                             | Required                                                                         | Description                                                                      |
| -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `object`                                                                         | [operations.ObjectT](../../models/operations/objectt.md)                         | :heavy_check_mark:                                                               | N/A                                                                              |
| `data`                                                                           | [operations.PostEmbeddingsData](../../models/operations/postembeddingsdata.md)[] | :heavy_check_mark:                                                               | N/A                                                                              |
| `model`                                                                          | *string*                                                                         | :heavy_check_mark:                                                               | N/A                                                                              |
| `usage`                                                                          | [operations.Usage](../../models/operations/usage.md)                             | :heavy_minus_sign:                                                               | N/A                                                                              |