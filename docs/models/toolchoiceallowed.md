# ToolChoiceAllowed

Constrains the model to a pre-defined set of allowed tools

## Example Usage

```typescript
import { ToolChoiceAllowed } from "@openrouter/sdk/models";

let value: ToolChoiceAllowed = {
  type: "allowed_tools",
  mode: "auto",
  tools: [
    {
      "type": "function",
      "name": "get_weather",
    },
  ],
};
```

## Fields

| Field                                                              | Type                                                               | Required                                                           | Description                                                        |
| ------------------------------------------------------------------ | ------------------------------------------------------------------ | ------------------------------------------------------------------ | ------------------------------------------------------------------ |
| `type`                                                             | [models.ToolChoiceAllowedType](../models/toolchoiceallowedtype.md) | :heavy_check_mark:                                                 | N/A                                                                |
| `mode`                                                             | *models.Mode*                                                      | :heavy_check_mark:                                                 | N/A                                                                |
| `tools`                                                            | Record<string, *any*>[]                                            | :heavy_check_mark:                                                 | N/A                                                                |