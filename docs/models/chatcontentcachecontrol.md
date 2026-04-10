# ChatContentCacheControl

Cache control for the content part

## Example Usage

```typescript
import { ChatContentCacheControl } from "@openrouter/sdk/models";

let value: ChatContentCacheControl = {
  type: "ephemeral",
};
```

## Fields

| Field                                                                          | Type                                                                           | Required                                                                       | Description                                                                    | Example                                                                        |
| ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ |
| `ttl`                                                                          | [models.AnthropicCacheControlTtl](../models/anthropiccachecontrolttl.md)       | :heavy_minus_sign:                                                             | N/A                                                                            | 5m                                                                             |
| `type`                                                                         | [models.ChatContentCacheControlType](../models/chatcontentcachecontroltype.md) | :heavy_check_mark:                                                             | N/A                                                                            |                                                                                |