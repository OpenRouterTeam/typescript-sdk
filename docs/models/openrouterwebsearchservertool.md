# OpenRouterWebSearchServerTool

OpenRouter built-in server tool: searches the web for current information

## Example Usage

```typescript
import { OpenRouterWebSearchServerTool } from "@openrouter/sdk/models";

let value: OpenRouterWebSearchServerTool = {
  type: "openrouter:web_search",
};
```

## Fields

| Field                                                                                      | Type                                                                                       | Required                                                                                   | Description                                                                                | Example                                                                                    |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| `type`                                                                                     | [models.OpenRouterWebSearchServerToolType](../models/openrouterwebsearchservertooltype.md) | :heavy_check_mark:                                                                         | N/A                                                                                        |                                                                                            |
| `parameters`                                                                               | [models.WebSearchConfig](../models/websearchconfig.md)                                     | :heavy_minus_sign:                                                                         | N/A                                                                                        | {<br/>"max_results": 5,<br/>"search_context_size": "medium"<br/>}                          |