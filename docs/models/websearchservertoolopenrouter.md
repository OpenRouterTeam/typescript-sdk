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

| Field                                                                                      | Type                                                                                       | Required                                                                                   | Description                                                                                |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| `parameters`                                                                               | [models.ParametersT](../models/parameterst.md)                                             | :heavy_minus_sign:                                                                         | N/A                                                                                        |
| `type`                                                                                     | [models.WebSearchServerToolOpenRouterType](../models/websearchservertoolopenroutertype.md) | :heavy_check_mark:                                                                         | N/A                                                                                        |