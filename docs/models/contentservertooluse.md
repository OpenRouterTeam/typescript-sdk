# ContentServerToolUse

## Example Usage

```typescript
import { ContentServerToolUse } from "@openrouter/sdk/models";

let value: ContentServerToolUse = {
  id: "<id>",
  name: "web_search",
  type: "server_tool_use",
};
```

## Fields

| Field                                                                                | Type                                                                                 | Required                                                                             | Description                                                                          | Example                                                                              |
| ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ |
| `cacheControl`                                                                       | [models.AnthropicCacheControlDirective](../models/anthropiccachecontroldirective.md) | :heavy_minus_sign:                                                                   | N/A                                                                                  | {<br/>"type": "ephemeral"<br/>}                                                      |
| `id`                                                                                 | *string*                                                                             | :heavy_check_mark:                                                                   | N/A                                                                                  |                                                                                      |
| `input`                                                                              | *any*                                                                                | :heavy_minus_sign:                                                                   | N/A                                                                                  |                                                                                      |
| `name`                                                                               | [models.AnthropicServerToolName](../models/anthropicservertoolname.md)               | :heavy_check_mark:                                                                   | N/A                                                                                  | web_search                                                                           |
| `type`                                                                               | *"server_tool_use"*                                                                  | :heavy_check_mark:                                                                   | N/A                                                                                  |                                                                                      |