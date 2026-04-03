# McpServerTool

MCP (Model Context Protocol) tool configuration

## Example Usage

```typescript
import { McpServerTool } from "@openrouter/sdk/models";

let value: McpServerTool = {
  type: "mcp",
  serverLabel: "my-server",
};
```

## Fields

| Field                                          | Type                                           | Required                                       | Description                                    |
| ---------------------------------------------- | ---------------------------------------------- | ---------------------------------------------- | ---------------------------------------------- |
| `type`                                         | *"mcp"*                                        | :heavy_check_mark:                             | N/A                                            |
| `serverLabel`                                  | *string*                                       | :heavy_check_mark:                             | N/A                                            |
| `allowedTools`                                 | *models.AllowedToolsUnion*                     | :heavy_minus_sign:                             | N/A                                            |
| `authorization`                                | *string*                                       | :heavy_minus_sign:                             | N/A                                            |
| `connectorId`                                  | [models.ConnectorId](../models/connectorid.md) | :heavy_minus_sign:                             | N/A                                            |
| `headers`                                      | Record<string, *string*>                       | :heavy_minus_sign:                             | N/A                                            |
| `requireApproval`                              | *models.RequireApprovalUnion*                  | :heavy_minus_sign:                             | N/A                                            |
| `serverDescription`                            | *string*                                       | :heavy_minus_sign:                             | N/A                                            |
| `serverUrl`                                    | *string*                                       | :heavy_minus_sign:                             | N/A                                            |