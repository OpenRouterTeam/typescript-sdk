# ToolDefinitionJson

## Example Usage

```typescript
import { ToolDefinitionJson } from "@openrouter/sdk/models";

let value: ToolDefinitionJson = {
  type: "function",
  function: {
    name: "<value>",
  },
};
```

## Fields

| Field                                                                        | Type                                                                         | Required                                                                     | Description                                                                  |
| ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `type`                                                                       | *"function"*                                                                 | :heavy_check_mark:                                                           | N/A                                                                          |
| `function`                                                                   | [models.ToolDefinitionJsonFunction](../models/tooldefinitionjsonfunction.md) | :heavy_check_mark:                                                           | N/A                                                                          |