# WebSearchServerTool

OpenRouter built-in server tool: searches the web for current information

## Example Usage

```typescript
import { WebSearchServerTool } from "@openrouter/sdk/models";

let value: WebSearchServerTool = {
  type: "openrouter:web_search",
};
```

## Fields

| Field                                                                              | Type                                                                               | Required                                                                           | Description                                                                        |
| ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `type`                                                                             | *"openrouter:web_search"*                                                          | :heavy_check_mark:                                                                 | N/A                                                                                |
| `parameters`                                                                       | [models.WebSearchServerToolParameters](../models/websearchservertoolparameters.md) | :heavy_minus_sign:                                                                 | N/A                                                                                |