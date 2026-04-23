# ContentWebSearchToolResult

## Example Usage

```typescript
import { ContentWebSearchToolResult } from "@openrouter/sdk/models";

let value: ContentWebSearchToolResult = {
  content: [
    {
      encryptedContent: "enc_content_0",
      title: "Example Page",
      type: "web_search_result",
      url: "https://example.com",
    },
  ],
  toolUseId: "<id>",
  type: "web_search_tool_result",
};
```

## Fields

| Field                                                                                | Type                                                                                 | Required                                                                             | Description                                                                          | Example                                                                              |
| ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ |
| `cacheControl`                                                                       | [models.AnthropicCacheControlDirective](../models/anthropiccachecontroldirective.md) | :heavy_minus_sign:                                                                   | N/A                                                                                  | {<br/>"type": "ephemeral"<br/>}                                                      |
| `content`                                                                            | *models.MessagesMessageParamContentUnion3*                                           | :heavy_check_mark:                                                                   | N/A                                                                                  |                                                                                      |
| `toolUseId`                                                                          | *string*                                                                             | :heavy_check_mark:                                                                   | N/A                                                                                  |                                                                                      |
| `type`                                                                               | *"web_search_tool_result"*                                                           | :heavy_check_mark:                                                                   | N/A                                                                                  |                                                                                      |