# ContentToolUse

## Example Usage

```typescript
import { ContentToolUse } from "@openrouter/sdk/models";

let value: ContentToolUse = {
  id: "<id>",
  name: "<value>",
  type: "tool_use",
};
```

## Fields

| Field                                                                                | Type                                                                                 | Required                                                                             | Description                                                                          | Example                                                                              |
| ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ |
| `cacheControl`                                                                       | [models.AnthropicCacheControlDirective](../models/anthropiccachecontroldirective.md) | :heavy_minus_sign:                                                                   | N/A                                                                                  | {<br/>"type": "ephemeral"<br/>}                                                      |
| `id`                                                                                 | *string*                                                                             | :heavy_check_mark:                                                                   | N/A                                                                                  |                                                                                      |
| `input`                                                                              | *any*                                                                                | :heavy_minus_sign:                                                                   | N/A                                                                                  |                                                                                      |
| `name`                                                                               | *string*                                                                             | :heavy_check_mark:                                                                   | N/A                                                                                  |                                                                                      |
| `type`                                                                               | *"tool_use"*                                                                         | :heavy_check_mark:                                                                   | N/A                                                                                  |                                                                                      |