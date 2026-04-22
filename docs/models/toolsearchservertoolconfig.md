# ToolSearchServerToolConfig

Configuration for the openrouter:tool_search server tool

## Example Usage

```typescript
import { ToolSearchServerToolConfig } from "@openrouter/sdk/models";

let value: ToolSearchServerToolConfig = {};
```

## Fields

| Field                                                      | Type                                                       | Required                                                   | Description                                                | Example                                                    |
| ---------------------------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------- |
| `maxResults`                                               | *number*                                                   | :heavy_minus_sign:                                         | Maximum number of tools to return. Defaults to 10, max 50. | 10                                                         |