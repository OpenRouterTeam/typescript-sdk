# CreateEmbeddingsResponseBody

Embeddings response containing embedding vectors

## Example Usage

```typescript
import { CreateEmbeddingsResponseBody } from "@openrouter/sdk/models/operations";

let value: CreateEmbeddingsResponseBody = {
  data: [
    {
      embedding: [
        0.0023064255,
        -0.009327292,
        0.015797347,
      ],
      object: "embedding",
    },
  ],
  model: "openai/text-embedding-3-small",
  object: "list",
};
```

## Fields

| Field                                                                                               | Type                                                                                                | Required                                                                                            | Description                                                                                         | Example                                                                                             |
| --------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| `data`                                                                                              | [operations.CreateEmbeddingsData](../../models/operations/createembeddingsdata.md)[]                | :heavy_check_mark:                                                                                  | List of embedding objects                                                                           | [<br/>{<br/>"embedding": [<br/>0.0023064255,<br/>-0.009327292,<br/>0.015797347<br/>],<br/>"index": 0,<br/>"object": "embedding"<br/>}<br/>] |
| `id`                                                                                                | *string*                                                                                            | :heavy_minus_sign:                                                                                  | Unique identifier for the embeddings response                                                       | embd-1234567890                                                                                     |
| `model`                                                                                             | *string*                                                                                            | :heavy_check_mark:                                                                                  | The model used for embeddings                                                                       | openai/text-embedding-3-small                                                                       |
| `object`                                                                                            | [operations.ObjectT](../../models/operations/objectt.md)                                            | :heavy_check_mark:                                                                                  | N/A                                                                                                 |                                                                                                     |
| `usage`                                                                                             | [operations.CreateEmbeddingsUsage](../../models/operations/createembeddingsusage.md)                | :heavy_minus_sign:                                                                                  | Token usage statistics                                                                              | {<br/>"prompt_tokens": 8,<br/>"total_tokens": 8<br/>}                                               |