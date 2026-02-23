# ChatMessageContentItemCacheControl

Cache control for the content part

## Example Usage

```typescript
import { ChatMessageContentItemCacheControl } from "@openrouter/sdk/models";

let value: ChatMessageContentItemCacheControl = {
  type: "ephemeral",
};
```

## Fields

| Field                                                                                                | Type                                                                                                 | Required                                                                                             | Description                                                                                          |
| ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `type`                                                                                               | [models.ChatMessageContentItemCacheControlType](../models/chatmessagecontentitemcachecontroltype.md) | :heavy_check_mark:                                                                                   | N/A                                                                                                  |
| `ttl`                                                                                                | [models.Ttl](../models/ttl.md)                                                                       | :heavy_minus_sign:                                                                                   | N/A                                                                                                  |