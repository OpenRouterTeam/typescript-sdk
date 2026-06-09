# CreateRerankRequestBody

Rerank request input

## Example Usage

```typescript
import { CreateRerankRequestBody } from "@openrouter/sdk/models/operations";

let value: CreateRerankRequestBody = {
  documents: [
    "Paris is the capital of France.",
    "Berlin is the capital of Germany.",
  ],
  model: "cohere/rerank-v3.5",
  query: "What is the capital of France?",
};
```

## Fields

| Field                                                                      | Type                                                                       | Required                                                                   | Description                                                                | Example                                                                    |
| -------------------------------------------------------------------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| `documents`                                                                | *string*[]                                                                 | :heavy_check_mark:                                                         | The list of documents to rerank                                            | [<br/>"Paris is the capital of France.",<br/>"Berlin is the capital of Germany."<br/>] |
| `model`                                                                    | *string*                                                                   | :heavy_check_mark:                                                         | The rerank model to use                                                    | cohere/rerank-v3.5                                                         |
| `provider`                                                                 | [models.ProviderPreferences](../../models/providerpreferences.md)          | :heavy_minus_sign:                                                         | N/A                                                                        | {<br/>"allow_fallbacks": true<br/>}                                        |
| `query`                                                                    | *string*                                                                   | :heavy_check_mark:                                                         | The search query to rerank documents against                               | What is the capital of France?                                             |
| `topN`                                                                     | *number*                                                                   | :heavy_minus_sign:                                                         | Number of most relevant documents to return                                | 3                                                                          |