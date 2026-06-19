# ToolCustom

## Example Usage

```typescript
import { ToolCustom } from "@openrouter/sdk/models";

let value: ToolCustom = {
  inputSchema: {},
  name: "<value>",
};
```

## Fields

| Field                                                                                | Type                                                                                 | Required                                                                             | Description                                                                          | Example                                                                              |
| ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ |
| `cacheControl`                                                                       | [models.AnthropicCacheControlDirective](../models/anthropiccachecontroldirective.md) | :heavy_minus_sign:                                                                   | N/A                                                                                  | {<br/>"type": "ephemeral"<br/>}                                                      |
| `description`                                                                        | *string*                                                                             | :heavy_minus_sign:                                                                   | N/A                                                                                  |                                                                                      |
| `inputSchema`                                                                        | [models.InputSchema](../models/inputschema.md)                                       | :heavy_check_mark:                                                                   | N/A                                                                                  |                                                                                      |
| `name`                                                                               | *string*                                                                             | :heavy_check_mark:                                                                   | N/A                                                                                  |                                                                                      |
| `type`                                                                               | [models.ToolTypeCustom](../models/tooltypecustom.md)                                 | :heavy_minus_sign:                                                                   | N/A                                                                                  |                                                                                      |