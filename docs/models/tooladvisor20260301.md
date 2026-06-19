# ToolAdvisor20260301

## Example Usage

```typescript
import { ToolAdvisor20260301 } from "@openrouter/sdk/models";

let value: ToolAdvisor20260301 = {
  model: "Fortwo",
  name: "advisor",
  type: "advisor_20260301",
};
```

## Fields

| Field                                                                                | Type                                                                                 | Required                                                                             | Description                                                                          | Example                                                                              |
| ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ |
| `allowedCallers`                                                                     | [models.AnthropicAllowedCallers](../models/anthropicallowedcallers.md)[]             | :heavy_minus_sign:                                                                   | N/A                                                                                  | [<br/>"direct"<br/>]                                                                 |
| `cacheControl`                                                                       | [models.AnthropicCacheControlDirective](../models/anthropiccachecontroldirective.md) | :heavy_minus_sign:                                                                   | N/A                                                                                  | {<br/>"type": "ephemeral"<br/>}                                                      |
| `caching`                                                                            | [models.Caching](../models/caching.md)                                               | :heavy_minus_sign:                                                                   | N/A                                                                                  | {<br/>"type": "ephemeral"<br/>}                                                      |
| `deferLoading`                                                                       | *boolean*                                                                            | :heavy_minus_sign:                                                                   | N/A                                                                                  |                                                                                      |
| `maxUses`                                                                            | *number*                                                                             | :heavy_minus_sign:                                                                   | N/A                                                                                  |                                                                                      |
| `model`                                                                              | *string*                                                                             | :heavy_check_mark:                                                                   | N/A                                                                                  |                                                                                      |
| `name`                                                                               | [models.NameAdvisor](../models/nameadvisor.md)                                       | :heavy_check_mark:                                                                   | N/A                                                                                  |                                                                                      |
| `type`                                                                               | [models.TypeAdvisor20260301](../models/typeadvisor20260301.md)                       | :heavy_check_mark:                                                                   | N/A                                                                                  |                                                                                      |