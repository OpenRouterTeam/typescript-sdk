# McpServerToolOpenRouter

OpenRouter built-in server tool: connects to a remote MCP server and proxies tool calls

## Example Usage

```typescript
import { McpServerToolOpenRouter } from "@openrouter/sdk/models";

let value: McpServerToolOpenRouter = {
  type: "openrouter:mcp",
};
```

## Fields

| Field                                                                          | Type                                                                           | Required                                                                       | Description                                                                    | Example                                                                        |
| ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ |
| `parameters`                                                                   | [models.McpServerToolConfig](../models/mcpservertoolconfig.md)                 | :heavy_minus_sign:                                                             | Configuration for the openrouter:mcp server tool                               | {<br/>"server_label": "my-mcp-server",<br/>"server_url": "https://example.com/mcp"<br/>} |
| `type`                                                                         | [models.McpServerToolOpenRouterType](../models/mcpservertoolopenroutertype.md) | :heavy_check_mark:                                                             | N/A                                                                            |                                                                                |