# FileSearchServerToolOpenRouter

OpenRouter built-in server tool: searches through files in vector stores for relevant content

## Example Usage

```typescript
import { FileSearchServerToolOpenRouter } from "@openrouter/sdk/models";

let value: FileSearchServerToolOpenRouter = {
  type: "openrouter:file_search",
};
```

## Fields

| Field                                                                                        | Type                                                                                         | Required                                                                                     | Description                                                                                  | Example                                                                                      |
| -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `parameters`                                                                                 | [models.FileSearchServerToolConfig](../models/filesearchservertoolconfig.md)                 | :heavy_minus_sign:                                                                           | Configuration for the openrouter:file_search server tool                                     | {<br/>"max_num_results": 20,<br/>"vector_store_ids": [<br/>"vs_abc123"<br/>]<br/>}           |
| `type`                                                                                       | [models.FileSearchServerToolOpenRouterType](../models/filesearchservertoolopenroutertype.md) | :heavy_check_mark:                                                                           | N/A                                                                                          |                                                                                              |