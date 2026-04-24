# NamespaceTool

Namespace tool that groups related tools (e.g. from an MCP server)

## Example Usage

```typescript
import { NamespaceTool } from "@openrouter/sdk/models";

let value: NamespaceTool = {
  name: "my_mcp_server",
  tools: [
    {
      name: "get_data",
      type: "function",
    },
  ],
  type: "namespace",
};
```

## Fields

| Field                                                        | Type                                                         | Required                                                     | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `description`                                                | *string*                                                     | :heavy_minus_sign:                                           | N/A                                                          |
| `name`                                                       | *string*                                                     | :heavy_check_mark:                                           | N/A                                                          |
| `tools`                                                      | [models.NamespaceToolTool](../models/namespacetooltool.md)[] | :heavy_check_mark:                                           | N/A                                                          |
| `type`                                                       | *"namespace"*                                                | :heavy_check_mark:                                           | N/A                                                          |