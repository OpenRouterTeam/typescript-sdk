# CreateRerankRequestBody

Rerank request input

## Example Usage

```typescript
import { CreateRerankRequestBody } from "@openrouter/sdk/models/operations";

let value: CreateRerankRequestBody = {
  model: "cohere/rerank-v3.5",
  query: "What is the capital of France?",
  documents: [
    "Paris is the capital of France.",
    "Berlin is the capital of Germany.",
  ],
};
```

## Fields

| Field                                                                      | Type                                                                       | Required                                                                   | Description                                                                | Example                                                                    |
| -------------------------------------------------------------------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| `model`                                                                    | *string*                                                                   | :heavy_check_mark:                                                         | The rerank model to use                                                    | cohere/rerank-v3.5                                                         |
| `query`                                                                    | *string*                                                                   | :heavy_check_mark:                                                         | The search query to rerank documents against                               | What is the capital of France?                                             |
| `documents`                                                                | *string*[]                                                                 | :heavy_check_mark:                                                         | The list of documents to rerank                                            | [<br/>"Paris is the capital of France.",<br/>"Berlin is the capital of Germany."<br/>] |
| `topN`                                                                     | *number*                                                                   | :heavy_minus_sign:                                                         | Number of most relevant documents to return                                | 3                                                                          |
| `provider`                                                                 | [models.ProviderPreferences](../../models/providerpreferences.md)          | :heavy_minus_sign:                                                         | Provider routing preferences for the request.                              |                                                                            |