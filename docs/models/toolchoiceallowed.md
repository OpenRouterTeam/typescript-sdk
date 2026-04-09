# ToolChoiceAllowed

Constrains the model to a pre-defined set of allowed tools

## Example Usage

```typescript
import { ToolChoiceAllowed } from "@openrouter/sdk/models";

let value: ToolChoiceAllowed = {
  mode: "auto",
  tools: [
    {
      "name": "get_weather",
      "type": "function",
    },
  ],
  type: "allowed_tools",
};
```

## Fields

| Field                                                              | Type                                                               | Required                                                           | Description                                                        |
| ------------------------------------------------------------------ | ------------------------------------------------------------------ | ------------------------------------------------------------------ | ------------------------------------------------------------------ |
| `mode`                                                             | *models.Mode*                                                      | :heavy_check_mark:                                                 | N/A                                                                |
| `tools`                                                            | Record<string, *any*>[]                                            | :heavy_check_mark:                                                 | N/A                                                                |
| `type`                                                             | [models.ToolChoiceAllowedType](../models/toolchoiceallowedtype.md) | :heavy_check_mark:                                                 | N/A                                                                |