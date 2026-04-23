# EditClearToolUses20250919

## Example Usage

```typescript
import { EditClearToolUses20250919 } from "@openrouter/sdk/models";

let value: EditClearToolUses20250919 = {
  type: "clear_tool_uses_20250919",
};
```

## Fields

| Field                                                                                    | Type                                                                                     | Required                                                                                 | Description                                                                              | Example                                                                                  |
| ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `clearAtLeast`                                                                           | [models.AnthropicInputTokensClearAtLeast](../models/anthropicinputtokensclearatleast.md) | :heavy_minus_sign:                                                                       | N/A                                                                                      | {<br/>"type": "input_tokens",<br/>"value": 50000<br/>}                                   |
| `clearToolInputs`                                                                        | *models.ClearToolInputs*                                                                 | :heavy_minus_sign:                                                                       | N/A                                                                                      |                                                                                          |
| `excludeTools`                                                                           | *string*[]                                                                               | :heavy_minus_sign:                                                                       | N/A                                                                                      |                                                                                          |
| `keep`                                                                                   | [models.AnthropicToolUsesKeep](../models/anthropictooluseskeep.md)                       | :heavy_minus_sign:                                                                       | N/A                                                                                      | {<br/>"type": "tool_uses",<br/>"value": 5<br/>}                                          |
| `trigger`                                                                                | *models.Trigger*                                                                         | :heavy_minus_sign:                                                                       | N/A                                                                                      |                                                                                          |
| `type`                                                                                   | *"clear_tool_uses_20250919"*                                                             | :heavy_check_mark:                                                                       | N/A                                                                                      |                                                                                          |