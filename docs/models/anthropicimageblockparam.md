# AnthropicImageBlockParam

## Example Usage

```typescript
import { AnthropicImageBlockParam } from "@openrouter/sdk/models";

let value: AnthropicImageBlockParam = {
  source: {
    data: "/9j/4AAQ...",
    mediaType: "image/jpeg",
    type: "base64",
  },
  type: "image",
};
```

## Fields

| Field                                                                                | Type                                                                                 | Required                                                                             | Description                                                                          | Example                                                                              |
| ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ |
| `cacheControl`                                                                       | [models.AnthropicCacheControlDirective](../models/anthropiccachecontroldirective.md) | :heavy_minus_sign:                                                                   | N/A                                                                                  | {<br/>"type": "ephemeral"<br/>}                                                      |
| `source`                                                                             | *models.AnthropicImageBlockParamSource*                                              | :heavy_check_mark:                                                                   | N/A                                                                                  |                                                                                      |
| `type`                                                                               | *"image"*                                                                            | :heavy_check_mark:                                                                   | N/A                                                                                  |                                                                                      |