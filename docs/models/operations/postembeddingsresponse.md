# PostEmbeddingsResponse

Embedding response

## Example Usage

```typescript
import { PostEmbeddingsResponse } from "@openrouter/sdk/models/operations";

let value: PostEmbeddingsResponse = {
  object: "list",
  data: [],
  model: "LeBaron",
};
```

## Fields

| Field                                                                            | Type                                                                             | Required                                                                         | Description                                                                      |
| -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `object`                                                                         | [operations.ObjectT](../../models/operations/objectt.md)                         | :heavy_check_mark:                                                               | N/A                                                                              |
| `data`                                                                           | [operations.PostEmbeddingsData](../../models/operations/postembeddingsdata.md)[] | :heavy_check_mark:                                                               | N/A                                                                              |
| `model`                                                                          | *string*                                                                         | :heavy_check_mark:                                                               | N/A                                                                              |
| `usage`                                                                          | [operations.Usage](../../models/operations/usage.md)                             | :heavy_minus_sign:                                                               | N/A                                                                              |