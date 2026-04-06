# AnthropicCacheControlDirective

Enable automatic prompt caching. When set, the system automatically applies cache breakpoints to the last cacheable block in the request. Currently supported for Anthropic Claude models.

## Example Usage

```typescript
import { AnthropicCacheControlDirective } from "@openrouter/sdk/models";

let value: AnthropicCacheControlDirective = {
  type: "ephemeral",
};
```

## Fields

| Field                                                                                        | Type                                                                                         | Required                                                                                     | Description                                                                                  |
| -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `type`                                                                                       | [models.AnthropicCacheControlDirectiveType](../models/anthropiccachecontroldirectivetype.md) | :heavy_check_mark:                                                                           | N/A                                                                                          |
| `ttl`                                                                                        | [models.AnthropicCacheControlTtl](../models/anthropiccachecontrolttl.md)                     | :heavy_minus_sign:                                                                           | N/A                                                                                          |