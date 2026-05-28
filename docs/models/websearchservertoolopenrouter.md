# WebSearchServerToolOpenRouter

OpenRouter built-in server tool: searches the web for current information

## Example Usage

```typescript
import { WebSearchServerToolOpenRouter } from "@openrouter/sdk/models";

let value: WebSearchServerToolOpenRouter = {
  type: "openrouter:web_search",
};
```

## Fields

| Field                                                                                                        | Type                                                                                                         | Required                                                                                                     | Description                                                                                                  | Example                                                                                                      |
| ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------ |
| `parameters`                                                                                                 | [models.WebSearchServerToolConfig](../models/websearchservertoolconfig.md)                                   | :heavy_minus_sign:                                                                                           | Configuration for the openrouter:web_search server tool. Available parameters depend on the selected engine. | {<br/>"category": "news",<br/>"engine": "exa",<br/>"max_results": 5,<br/>"search_context_size": "medium"<br/>} |
| `type`                                                                                                       | *"openrouter:web_search"*                                                                                    | :heavy_check_mark:                                                                                           | N/A                                                                                                          |                                                                                                              |