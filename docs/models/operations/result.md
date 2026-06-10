# Result

A single rerank result

## Example Usage

```typescript
import { Result } from "@openrouter/sdk/models/operations";

let value: Result = {
  document: {
    text: "Paris is the capital of France.",
  },
  index: 0,
  relevanceScore: 0.98,
};
```

## Fields

| Field                                                      | Type                                                       | Required                                                   | Description                                                | Example                                                    |
| ---------------------------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------- |
| `document`                                                 | [operations.Document](../../models/operations/document.md) | :heavy_check_mark:                                         | The document object containing the original text           |                                                            |
| `index`                                                    | *number*                                                   | :heavy_check_mark:                                         | Index of the document in the original input list           | 0                                                          |
| `relevanceScore`                                           | *number*                                                   | :heavy_check_mark:                                         | Relevance score of the document to the query               | 0.98                                                       |