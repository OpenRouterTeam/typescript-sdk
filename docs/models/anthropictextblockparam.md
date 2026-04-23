# AnthropicTextBlockParam

## Example Usage

```typescript
import { AnthropicTextBlockParam } from "@openrouter/sdk/models";

let value: AnthropicTextBlockParam = {
  text: "Hello, world!",
  type: "text",
};
```

## Fields

| Field                                                                                | Type                                                                                 | Required                                                                             | Description                                                                          | Example                                                                              |
| ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ |
| `cacheControl`                                                                       | [models.AnthropicCacheControlDirective](../models/anthropiccachecontroldirective.md) | :heavy_minus_sign:                                                                   | N/A                                                                                  | {<br/>"type": "ephemeral"<br/>}                                                      |
| `citations`                                                                          | *models.Citation*[]                                                                  | :heavy_minus_sign:                                                                   | N/A                                                                                  |                                                                                      |
| `text`                                                                               | *string*                                                                             | :heavy_check_mark:                                                                   | N/A                                                                                  |                                                                                      |
| `type`                                                                               | *"text"*                                                                             | :heavy_check_mark:                                                                   | N/A                                                                                  |                                                                                      |