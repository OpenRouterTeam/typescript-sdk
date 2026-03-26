# ChatMessageContentItemText

Text content part

## Example Usage

```typescript
import { ChatMessageContentItemText } from "@openrouter/sdk/models";

let value: ChatMessageContentItemText = {
  type: "text",
  text: "Hello, world!",
};
```

## Fields

| Field                                                                                        | Type                                                                                         | Required                                                                                     | Description                                                                                  | Example                                                                                      |
| -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `type`                                                                                       | [models.ChatMessageContentItemTextType](../models/chatmessagecontentitemtexttype.md)         | :heavy_check_mark:                                                                           | N/A                                                                                          |                                                                                              |
| `text`                                                                                       | *string*                                                                                     | :heavy_check_mark:                                                                           | N/A                                                                                          |                                                                                              |
| `cacheControl`                                                                               | [models.ChatMessageContentItemCacheControl](../models/chatmessagecontentitemcachecontrol.md) | :heavy_minus_sign:                                                                           | Cache control for the content part                                                           | {<br/>"type": "ephemeral",<br/>"ttl": "5m"<br/>}                                             |