# ToolSearchTool

Hosted tool_search tool used to discover deferred tools

## Example Usage

```typescript
import { ToolSearchTool } from "@openrouter/sdk/models";

let value: ToolSearchTool = {
  type: "tool_search",
};
```

## Fields

| Field                                      | Type                                       | Required                                   | Description                                |
| ------------------------------------------ | ------------------------------------------ | ------------------------------------------ | ------------------------------------------ |
| `description`                              | *string*                                   | :heavy_minus_sign:                         | N/A                                        |
| `execution`                                | [models.Execution](../models/execution.md) | :heavy_minus_sign:                         | N/A                                        |
| `parameters`                               | *any*                                      | :heavy_minus_sign:                         | N/A                                        |
| `type`                                     | *"tool_search"*                            | :heavy_check_mark:                         | N/A                                        |