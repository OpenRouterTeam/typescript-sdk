# ChatSearchModelsServerTool

OpenRouter built-in server tool: searches and filters AI models available on OpenRouter

## Example Usage

```typescript
import { ChatSearchModelsServerTool } from "@openrouter/sdk/models";

let value: ChatSearchModelsServerTool = {
  type: "experimental__search_models",
};
```

## Fields

| Field                                                                                | Type                                                                                 | Required                                                                             | Description                                                                          | Example                                                                              |
| ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ |
| `type`                                                                               | [models.ChatSearchModelsServerToolType](../models/chatsearchmodelsservertooltype.md) | :heavy_check_mark:                                                                   | N/A                                                                                  |                                                                                      |
| `parameters`                                                                         | [models.SearchModelsServerToolConfig](../models/searchmodelsservertoolconfig.md)     | :heavy_minus_sign:                                                                   | Configuration for the experimental__search_models server tool                        | {<br/>"max_results": 5<br/>}                                                         |