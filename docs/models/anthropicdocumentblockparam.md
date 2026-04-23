# AnthropicDocumentBlockParam

## Example Usage

```typescript
import { AnthropicDocumentBlockParam } from "@openrouter/sdk/models";

let value: AnthropicDocumentBlockParam = {
  source: {
    data: "Hello, world!",
    mediaType: "text/plain",
    type: "text",
  },
  type: "document",
};
```

## Fields

| Field                                                                                            | Type                                                                                             | Required                                                                                         | Description                                                                                      | Example                                                                                          |
| ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| `cacheControl`                                                                                   | [models.AnthropicCacheControlDirective](../models/anthropiccachecontroldirective.md)             | :heavy_minus_sign:                                                                               | N/A                                                                                              | {<br/>"type": "ephemeral"<br/>}                                                                  |
| `citations`                                                                                      | [models.AnthropicDocumentBlockParamCitations](../models/anthropicdocumentblockparamcitations.md) | :heavy_minus_sign:                                                                               | N/A                                                                                              |                                                                                                  |
| `context`                                                                                        | *string*                                                                                         | :heavy_minus_sign:                                                                               | N/A                                                                                              |                                                                                                  |
| `source`                                                                                         | *models.AnthropicDocumentBlockParamSourceUnion*                                                  | :heavy_check_mark:                                                                               | N/A                                                                                              |                                                                                                  |
| `title`                                                                                          | *string*                                                                                         | :heavy_minus_sign:                                                                               | N/A                                                                                              |                                                                                                  |
| `type`                                                                                           | *"document"*                                                                                     | :heavy_check_mark:                                                                               | N/A                                                                                              |                                                                                                  |