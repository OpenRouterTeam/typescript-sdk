# ToolSearchServerTool

OpenRouter built-in server tool: searches for available server tools on OpenRouter

## Example Usage

```typescript
import { ToolSearchServerTool } from "@openrouter/sdk/models";

let value: ToolSearchServerTool = {
  type: "openrouter:tool_search",
};
```

## Fields

| Field                                                                        | Type                                                                         | Required                                                                     | Description                                                                  | Example                                                                      |
| ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `parameters`                                                                 | [models.ToolSearchServerToolConfig](../models/toolsearchservertoolconfig.md) | :heavy_minus_sign:                                                           | Configuration for the openrouter:tool_search server tool                     | {<br/>"max_results": 10<br/>}                                                |
| `type`                                                                       | [models.ToolSearchServerToolType](../models/toolsearchservertooltype.md)     | :heavy_check_mark:                                                           | N/A                                                                          |                                                                              |