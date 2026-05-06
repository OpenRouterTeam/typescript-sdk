# ToolSearchTool

Tool search tool for dynamic tool discovery

## Example Usage

```typescript
import { ToolSearchTool } from "@openrouter/sdk/models";

let value: ToolSearchTool = {
  type: "tool_search",
};
```

## Fields

| Field                 | Type                  | Required              | Description           |
| --------------------- | --------------------- | --------------------- | --------------------- |
| `description`         | *string*              | :heavy_minus_sign:    | N/A                   |
| `execution`           | *string*              | :heavy_minus_sign:    | N/A                   |
| `parameters`          | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |
| `type`                | *"tool_search"*       | :heavy_check_mark:    | N/A                   |