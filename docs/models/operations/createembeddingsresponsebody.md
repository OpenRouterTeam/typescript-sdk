# CreateEmbeddingsResponseBody

Embeddings response containing embedding vectors

## Example Usage

```typescript
import { CreateEmbeddingsResponseBody } from "@openrouter/sdk/models/operations";

let value: CreateEmbeddingsResponseBody = {
  object: "list",
  data: [
    {
      object: "embedding",
      embedding: [
        0.0023064255,
        -0.009327292,
        0.015797347,
      ],
    },
  ],
  model: "openai/text-embedding-3-small",
};
```

## Fields

| Field                                                                                               | Type                                                                                                | Required                                                                                            | Description                                                                                         | Example                                                                                             |
| --------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| `id`                                                                                                | *string*                                                                                            | :heavy_minus_sign:                                                                                  | Unique identifier for the embeddings response                                                       | embd-1234567890                                                                                     |
| `object`                                                                                            | [operations.ObjectT](../../models/operations/objectt.md)                                            | :heavy_check_mark:                                                                                  | N/A                                                                                                 |                                                                                                     |
| `data`                                                                                              | [operations.CreateEmbeddingsData](../../models/operations/createembeddingsdata.md)[]                | :heavy_check_mark:                                                                                  | List of embedding objects                                                                           | [<br/>{<br/>"object": "embedding",<br/>"embedding": [<br/>0.0023064255,<br/>-0.009327292,<br/>0.015797347<br/>],<br/>"index": 0<br/>}<br/>] |
| `model`                                                                                             | *string*                                                                                            | :heavy_check_mark:                                                                                  | The model used for embeddings                                                                       | openai/text-embedding-3-small                                                                       |
| `usage`                                                                                             | [operations.CreateEmbeddingsUsage](../../models/operations/createembeddingsusage.md)                | :heavy_minus_sign:                                                                                  | Token usage statistics                                                                              | {<br/>"prompt_tokens": 8,<br/>"total_tokens": 8<br/>}                                               |