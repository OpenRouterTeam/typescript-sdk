# ContentToolResult

## Example Usage

```typescript
import { ContentToolResult } from "@openrouter/sdk/models";

let value: ContentToolResult = {
  toolUseId: "<id>",
  type: "tool_result",
};
```

## Fields

| Field                                                                                | Type                                                                                 | Required                                                                             | Description                                                                          | Example                                                                              |
| ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ |
| `cacheControl`                                                                       | [models.AnthropicCacheControlDirective](../models/anthropiccachecontroldirective.md) | :heavy_minus_sign:                                                                   | N/A                                                                                  | {<br/>"type": "ephemeral"<br/>}                                                      |
| `content`                                                                            | *models.MessagesMessageParamContentUnion2*                                           | :heavy_minus_sign:                                                                   | N/A                                                                                  |                                                                                      |
| `isError`                                                                            | *boolean*                                                                            | :heavy_minus_sign:                                                                   | N/A                                                                                  |                                                                                      |
| `toolUseId`                                                                          | *string*                                                                             | :heavy_check_mark:                                                                   | N/A                                                                                  |                                                                                      |
| `type`                                                                               | *"tool_result"*                                                                      | :heavy_check_mark:                                                                   | N/A                                                                                  |                                                                                      |