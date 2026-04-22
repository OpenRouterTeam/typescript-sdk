# McpServerToolConfig

Configuration for the openrouter:mcp server tool

## Example Usage

```typescript
import { McpServerToolConfig } from "@openrouter/sdk/models";

let value: McpServerToolConfig = {
  serverUrl: "https://example.com/mcp",
};
```

## Fields

| Field                                                                                      | Type                                                                                       | Required                                                                                   | Description                                                                                | Example                                                                                    |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| `allowedTools`                                                                             | *string*[]                                                                                 | :heavy_minus_sign:                                                                         | Restrict which tools from the MCP server can be called. If omitted, all tools are allowed. | [<br/>"query_database",<br/>"list_tables"<br/>]                                            |
| `authorization`                                                                            | *string*                                                                                   | :heavy_minus_sign:                                                                         | Authorization header value for the MCP server (e.g. "Bearer sk-...").                      | Bearer sk-my-token                                                                         |
| `headers`                                                                                  | Record<string, *string*>                                                                   | :heavy_minus_sign:                                                                         | Custom HTTP headers to send with requests to the MCP server.                               |                                                                                            |
| `serverDescription`                                                                        | *string*                                                                                   | :heavy_minus_sign:                                                                         | A description of the MCP server for the model to understand its purpose.                   |                                                                                            |
| `serverLabel`                                                                              | *string*                                                                                   | :heavy_minus_sign:                                                                         | A human-readable label for the MCP server.                                                 | my-mcp-server                                                                              |
| `serverUrl`                                                                                | *string*                                                                                   | :heavy_check_mark:                                                                         | The URL of the remote MCP server to connect to.                                            | https://example.com/mcp                                                                    |