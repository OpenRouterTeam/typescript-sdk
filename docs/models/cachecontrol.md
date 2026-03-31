# CacheControl

Enable automatic prompt caching. When set, the system automatically applies cache breakpoints to the last cacheable block in the request. Currently supported for Anthropic Claude models.

## Example Usage

```typescript
import { CacheControl } from "@openrouter/sdk/models";

let value: CacheControl = {
  type: "ephemeral",
};
```

## Fields

| Field                                                  | Type                                                   | Required                                               | Description                                            |
| ------------------------------------------------------ | ------------------------------------------------------ | ------------------------------------------------------ | ------------------------------------------------------ |
| `type`                                                 | [models.ChatRequestType](../models/chatrequesttype.md) | :heavy_check_mark:                                     | N/A                                                    |
| `ttl`                                                  | [models.ChatRequestTtl](../models/chatrequestttl.md)   | :heavy_minus_sign:                                     | N/A                                                    |