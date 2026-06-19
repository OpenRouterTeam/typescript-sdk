# AnthropicSearchResultBlockParam

## Example Usage

```typescript
import { AnthropicSearchResultBlockParam } from "@openrouter/sdk/models";

let value: AnthropicSearchResultBlockParam = {
  content: [
    {
      text: "Result content",
      type: "text",
    },
  ],
  source: "example_source",
  title: "Example Result",
  type: "search_result",
};
```

## Fields

| Field                                                                                                    | Type                                                                                                     | Required                                                                                                 | Description                                                                                              | Example                                                                                                  |
| -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `cacheControl`                                                                                           | [models.AnthropicCacheControlDirective](../models/anthropiccachecontroldirective.md)                     | :heavy_minus_sign:                                                                                       | N/A                                                                                                      | {<br/>"type": "ephemeral"<br/>}                                                                          |
| `citations`                                                                                              | [models.AnthropicSearchResultBlockParamCitations](../models/anthropicsearchresultblockparamcitations.md) | :heavy_minus_sign:                                                                                       | N/A                                                                                                      |                                                                                                          |
| `content`                                                                                                | [models.AnthropicTextBlockParam](../models/anthropictextblockparam.md)[]                                 | :heavy_check_mark:                                                                                       | N/A                                                                                                      |                                                                                                          |
| `source`                                                                                                 | *string*                                                                                                 | :heavy_check_mark:                                                                                       | N/A                                                                                                      |                                                                                                          |
| `title`                                                                                                  | *string*                                                                                                 | :heavy_check_mark:                                                                                       | N/A                                                                                                      |                                                                                                          |
| `type`                                                                                                   | *"search_result"*                                                                                        | :heavy_check_mark:                                                                                       | N/A                                                                                                      |                                                                                                          |