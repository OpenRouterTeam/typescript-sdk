# CreateEmbeddingsRequestBody

Embeddings request input

## Example Usage

```typescript
import { CreateEmbeddingsRequestBody } from "@openrouter/sdk/models/operations";

let value: CreateEmbeddingsRequestBody = {
  input: "The quick brown fox jumps over the lazy dog",
  model: "openai/text-embedding-3-small",
};
```

## Fields

| Field                                                                  | Type                                                                   | Required                                                               | Description                                                            | Example                                                                |
| ---------------------------------------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| `dimensions`                                                           | *number*                                                               | :heavy_minus_sign:                                                     | The number of dimensions for the output embeddings                     | 1536                                                                   |
| `encodingFormat`                                                       | [operations.EncodingFormat](../../models/operations/encodingformat.md) | :heavy_minus_sign:                                                     | The format of the output embeddings                                    | float                                                                  |
| `input`                                                                | *operations.InputUnion*                                                | :heavy_check_mark:                                                     | Text, token, or multimodal input(s) to embed                           | The quick brown fox jumps over the lazy dog                            |
| `inputType`                                                            | *string*                                                               | :heavy_minus_sign:                                                     | The type of input (e.g. search_query, search_document)                 | search_query                                                           |
| `model`                                                                | *string*                                                               | :heavy_check_mark:                                                     | The model to use for embeddings                                        | openai/text-embedding-3-small                                          |
| `provider`                                                             | [models.ProviderPreferences](../../models/providerpreferences.md)      | :heavy_minus_sign:                                                     | N/A                                                                    | {<br/>"allow_fallbacks": true<br/>}                                    |
| `user`                                                                 | *string*                                                               | :heavy_minus_sign:                                                     | A unique identifier for the end-user                                   | user-1234                                                              |