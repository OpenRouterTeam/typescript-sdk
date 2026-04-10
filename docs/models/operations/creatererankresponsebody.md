# CreateRerankResponseBody

Rerank response containing ranked results

## Example Usage

```typescript
import { CreateRerankResponseBody } from "@openrouter/sdk/models/operations";

let value: CreateRerankResponseBody = {
  model: "cohere/rerank-v3.5",
  results: [
    {
      document: {
        text: "Paris is the capital of France.",
      },
      index: 0,
      relevanceScore: 0.98,
    },
  ],
};
```

## Fields

| Field                                                                                                  | Type                                                                                                   | Required                                                                                               | Description                                                                                            | Example                                                                                                |
| ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| `id`                                                                                                   | *string*                                                                                               | :heavy_minus_sign:                                                                                     | Unique identifier for the rerank response (ORID format)                                                | gen-rerank-1234567890-abc                                                                              |
| `model`                                                                                                | *string*                                                                                               | :heavy_check_mark:                                                                                     | The model used for reranking                                                                           | cohere/rerank-v3.5                                                                                     |
| `provider`                                                                                             | *string*                                                                                               | :heavy_minus_sign:                                                                                     | The provider that served the rerank request                                                            | Cohere                                                                                                 |
| `results`                                                                                              | [operations.Result](../../models/operations/result.md)[]                                               | :heavy_check_mark:                                                                                     | List of rerank results sorted by relevance                                                             | [<br/>{<br/>"document": {<br/>"text": "Paris is the capital of France."<br/>},<br/>"index": 0,<br/>"relevance_score": 0.98<br/>}<br/>] |
| `usage`                                                                                                | [operations.CreateRerankUsage](../../models/operations/creatererankusage.md)                           | :heavy_minus_sign:                                                                                     | Usage statistics                                                                                       | {<br/>"search_units": 1,<br/>"total_tokens": 150<br/>}                                                 |